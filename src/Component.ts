import {
  newScope,
  SuperScope,
  SuperStruct,
  SuperArray,
  SuperItemDefinition,
  ProxyfiedStruct,
  ProxyfiedArray
} from 'squidlet-sprog'
import {omitUndefined, makeUniqId, IndexedEventEmitter} from 'squidlet-lib'
import {CmpInstanceDefinition} from './types/CmpInstanceDefinition.js'
import {IncomeEvents, OutcomeEvents} from './types/DomEvents.js'
import {RenderedElement} from './types/RenderedElement.js'
import {ComponentSlotsManager, SlotsDefinition} from './ComponentSlotsManager.js'
import {COMPONENT_ID_BYTES_NUM} from './types/constants.js'
import {AppSingleton, COMPONENT_EVENT_PREFIX} from './AppSingleton.js'
import {makeComponentUiParams, parseCmpInstanceDefinition, renderComponentBase} from './helpers/componentHelper.js';


// TODO: поддержка перемещения элементов - добавить в SuperArray
// TODO: внимательно продумать unmount и destroy
// TODO: продумать связь props с потомками компонента

// TODO: run onUpdate callback of component definition
// TODO: call onMount component's callback of component definition
// TODO: call onUnmount component's callback of component definition

// TODO: можно ли перемещать компонент в другое дерево? если да то надо менять parent

export enum COMPONENT_EVENTS {
  initStart,
  initFinished,
  mounted,
  unmounted,
  // any changes of component's props of state or children array
  update,
  // start destroying of component. It will not emit unmount because it means unmount too.
  destroy,
}

// It is definition of component class
export interface ComponentDefinition {
  name: string
  // definition of props which are controlled by parent component
  props?: Record<string, SuperItemDefinition>
  // local state
  state?: Record<string, SuperItemDefinition>
  // names of params which will be sent to UI.
  // they will be got from props and state.
  // to rename or get param from component use [newName, () => { return ... }]
  // deep param path is supported
  uiParams?: (string | [string, () => any])[]
  // handlers of income ui events. Like {click: $expDefinition}
  // TODO: добавить SuperFunc и для обычной прописать аргементы
  handlers?: Record<string, () => void>
  tmpl?: CmpInstanceDefinition[]
}

/**
 * Scope for executing sprog
 */
export interface ComponentScope {
  app: AppSingleton
  props: ProxyfiedStruct
  state: ProxyfiedStruct

  // TODO: чо за нах? Нужен контекст от screen
  // local vars and context of functions execution
  //context: Record<any, any>
}


/**
 * All the items of Abstract UI are components or inherit it.
 * Each UI element which is sent to renderer is component, but renderer can
 * render it as several elements if needs, but it actually doesn't matter.
 */
export class Component {
  readonly isRoot: boolean = false
  // componentId
  readonly id: string
  readonly events = new IndexedEventEmitter()
  // ordered children in super array. Add, remove or reorder children will
  // emit an array's change event
  readonly children: ProxyfiedArray<Component>
  // Parent of this component. If it is root then it will be null
  readonly parent: Component
  // Props values set in the parent tmpl
  readonly props: ProxyfiedStruct
  readonly slots: ComponentSlotsManager
  // it uses only by parent to set props. Don't use it by yourself
  $$propsSetter!: (name: string, value: any) => void

  protected readonly app: AppSingleton
  // component's class definition
  protected readonly componentDefinition: ComponentDefinition

  // TODO: наверное это геттер из scope
  // local state of component instance
  protected readonly state: ProxyfiedStruct
  // TODO: наверное это геттер из scope
  // It is scope for template runtime
  protected readonly scope: ComponentScope & SuperScope
  private incomeEventListenerIndex?: number

  // Runtime position of children components. Like [componentId, ...]
  //protected childrenPosition: string[] = []


  /**
   * component name. The same as in template and component definition
   */
  get name(): string {
    return this.componentDefinition.name
  }


  protected constructor(
    app: AppSingleton,
    parent: Component,
    // definition component itself
    componentDefinition: ComponentDefinition,
    // slots of component which get from parent component template
    slotsDefinition: SlotsDefinition,

    // TODO: может просто родитель сам устанавливать значений в одностороннем порядке
    //       или будет делать Link к себе
    // props which parent give
    //incomeProps: ProxyfiedStruct
  ) {
    this.app = app
    this.parent = parent
    this.componentDefinition = componentDefinition
    this.id = this.makeId()
    this.slots = new ComponentSlotsManager(slotsDefinition)
    this.props = (new SuperStruct(componentDefinition.props || {}, true)).getProxy()
    this.state = (new SuperStruct(componentDefinition.state || {})).getProxy()
    // TODO: наследовать от родиьельского scope
    this.scope = newScope<ComponentScope>({
      app: this.app,
      props: this.props,
      state: this.state,
      // TODO: добавить slots
    })
    this.children = (new SuperArray({
      // TODO: а тип какой ????
      type: 'any',
      readonly: false,
      nullable: false,
    })).getProxy()
  }


  async init() {
    this.events.emit(COMPONENT_EVENTS.initStart)
    // TODO: поставить initial values
    this.$$propsSetter = this.props.$super.init()
    // TODO: поставить initial values из свойства data шаблона
    this.state.$super.init()

    const childrenInitArr = this.instantiateChildren()

    this.children.$super.init(childrenInitArr)

    // TODO: run onInit callback - это будут линии sprog

    // init all the children components
    for (const childIndex of this.children.$super.allKeys) {
      // child is component
      await this.children[childIndex].init()
    }

    this.events.emit(COMPONENT_EVENTS.initFinished)
  }

  /**
   * Destroy my and all the my children.
   * It will not rise unmount. You have to listen destroying component to totaly
   * remove it. And umount means that component doesn't remove from memory.
   */
  async destroy() {
    this.events.emit(COMPONENT_EVENTS.destroy)

    this.events.destroy()

    // TODO: родитель должен понять что ребенок дестроится и разорвать связь у себя
    //       и удалить его у себя

    this.app.incomeEvents.removeListener(this.incomeEventListenerIndex)
    // destroy all the children
    for (const component of this.children) await component.destroy()

    await this.slots.destroy()
    this.scope.$super.destroy()
    this.children.$super.destroy()
    // props and state are destroyed as scope children
    // emit component destroy event
    this.app.$$render(OutcomeEvents.destroy, renderComponentBase(this))
  }


  /**
   * Mount this component's element.
   * Actually means emit mount event and listen element's income events.
   * @param silent - means do not emit render event.
   *   It is used only if parent has already rendered. Buy this component need to
   *   listen ui events
   */
  async mount(silent: boolean = false) {
    // start listening income events
    this.incomeEventListenerIndex = this.app.incomeEvents.addListener(
      COMPONENT_EVENT_PREFIX + this.id,
      this.handleIncomeEvent
    )

    if (!silent) {
      this.app.$$render(OutcomeEvents.mount, this.render())
    }

    for (const child of this.children) {
      // mount child always silent
      await child.mount(true)
    }

    this.events.emit(COMPONENT_EVENTS.mounted)
  }

  /**
   * Unmount this component's element.
   * Means stop listenint ui change events and But the component won't be destroyed
   */
  async unmount(silent: boolean = false) {
    // stop listening income events
    this.app.incomeEvents.removeListener(this.incomeEventListenerIndex)

    for (const child of this.children) {
      // unmount child always silent
      await child.unmount(true)
    }

    if (!silent) {
      this.app.$$render(OutcomeEvents.unMount, renderComponentBase(this))
    }

    this.events.emit(COMPONENT_EVENTS.unmounted)
  }

  /**
   * Get position of child by its UI el id.
   * -1 means - can't find child
   */
  getIndexOfChild(childId: string): number | undefined {
    return this.children.findIndex((el) => el.id === childId)
  }

  /**
   * Make full render element with children
   */
  render(): RenderedElement {
    return omitUndefined({
      ...this.renderSelf(),
      children: this.getChildrenUiEls(),
    } as RenderedElement) as RenderedElement
  }

  /**
   * Make render element only for itself without children
   */
  renderSelf(): RenderedElement {
    return omitUndefined({
      ...renderComponentBase(this),
      params: makeComponentUiParams(this.componentDefinition, this.props, this.state),
    } as RenderedElement) as RenderedElement
  }


  protected makeId(): string {
    return makeUniqId(COMPONENT_ID_BYTES_NUM)
  }


  // TODO: review
  private handleIncomeEvent = (event: IncomeEvents, ...args: any[]) => {
    (async () => {
      switch (event) {
        case IncomeEvents.click:
          if (this.componentDefinition?.handlers?.click) {
            const scope = newScope({
              context: {
                args
              }
            }, this.scope)

            await scope.run(this.componentDefinition.handlers.click)
          }

          break
      }
    })()
      .catch(this.app.log.error)
  }

  // TODO: review
  private instantiateChildren(): Component[] {
    const res: Component[] = []

    // If component have tmpl then get child from it - it is default behaviour
    if (this.componentDefinition.tmpl) {
      for (const childInstanceDef of this.componentDefinition.tmpl) {
        res.push(this.instantiateChild(childInstanceDef))
      }
    }
    // if component doesn't have a tmpl then just render default slot like it is tmpl
    else {
      for (const childInstanceDef of this.slots.getDefaultDefinition() || []) {
        res.push(this.instantiateChild(childInstanceDef))
      }
    }
    // if not - so not one children then
    return res
  }

  // TODO: review
  instantiateChild(childInstanceDefinition: CmpInstanceDefinition): Component {
    const {
      componentDefinition,
      slotDefinition,
      props,
      // TODO: а реально ли пропс потомка должен иметь scope родителя???
      // TODO: или всётаки свой scope???
      // TODO: propSetter надо сохранить себе чтобы потом устанавливать значения
    } = parseCmpInstanceDefinition(this.app, childInstanceDefinition)

    //console.log(1111, childUiDefinition, componentDefinition, slotDefinition, props)

    return new Component(
      this.app,
      this,
      componentDefinition,
      slotDefinition,
      //props
    )
  }

  // TODO: review
  private getChildrenUiEls(): RenderedElement[] | undefined {
    const res: RenderedElement[] = []

    for (const child of this.children) res.push(child.render())

    if (!res.length) return

    return res
  }

}
