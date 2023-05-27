import {
  newScope,
  SuperScope,
  SuperStruct,
  SuperArray,
  SuperItemDefinition,
  SuperFuncDefinition,
  SimpleFuncDefinition,
  ProxyfiedStruct,
  ProxyfiedArray
} from 'squidlet-sprog'
import {omitUndefined, makeUniqId} from 'squidlet-lib'
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


// It is definition of component class
export interface ComponentDefinition {
  name: string
  // props which are controlled by parent component
  props?: Record<string, SuperItemDefinition>
  // local state
  state?: Record<string, SuperItemDefinition>
  // names of params which will be sent to UI.
  // they will be got from props and state.
  // to rename or get param from component use [newName, () => { return ... }]
  // deep param path is supported
  uiParams?: (string | [string, () => any])[]
  // handlers of income ui events. Like {click: $expDefinition}
  handlers?: Record<string, SuperFuncDefinition | SimpleFuncDefinition>
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
  // ordered children in super array. Add, remove or reorder children will
  // emit an array's change event
  readonly children: ProxyfiedArray<Component>
  // Parent of this component. If it is root then it will be null
  readonly parent: Component
  // Props values set in the parent tmpl
  readonly props: ProxyfiedStruct
  readonly slots: ComponentSlotsManager

  protected readonly app: AppSingleton
  // component's class definition
  protected readonly componentDefinition: ComponentDefinition
  // local state of component instance
  protected readonly state: ProxyfiedStruct
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
    // props which parent give
    incomeProps: ProxyfiedStruct
  ) {
    this.app = app
    this.parent = parent
    this.componentDefinition = componentDefinition
    this.props = incomeProps
    this.id = this.makeId()
    this.slots = new ComponentSlotsManager(slotsDefinition)
    this.scope = newScope<ComponentScope>({
      app: this.app,
      props: this.props,
      // set it temporary because the state hasn't been initialized yet
      state: {} as any,
    })
    this.state = (new SuperStruct(this.scope, componentDefinition.state || {})).getProxy()
    // set initialized state to scope
    this.scope.state = this.state
    this.children = (new SuperArray(this.scope)).getProxy()
  }


  async init() {
    this.state.$super.init()

    const childrenInitArr = this.instantiateChildren()

    this.children.$super.init(childrenInitArr)

    // TODO: run onInit callback

    // init all the children components
    for (const component of this.children) await component.init()
  }

  async destroy() {

    // TODO: означает ли это unmount тоже???
    // TODO: нужно сообщить родителю

    this.app.incomeEvents.removeListener(this.incomeEventListenerIndex)

    for (const component of this.children) await component.destroy()

    this.children.$super.destroy()
    await this.slots.destroy()
    // TODO: родитель должен понять что ребенок дестроится и разорвать связь у себя
    //       и удалить его у себя
    this.props.$super.destroy()
    this.state.$super.destroy()
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
      this.app.outcomeEvents.emit(OutcomeEvents.mount, this.render())
    }

    for (const child of this.children) {
      // mount child always silent
      await child.mount(true)
    }
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
      this.app.outcomeEvents.emit(OutcomeEvents.unMount, renderComponentBase(this))
    }
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
      props
    )
  }

  private getChildrenUiEls(): RenderedElement[] | undefined {
    const res: RenderedElement[] = []

    for (const child of this.children) res.push(child.render())

    if (!res.length) return

    return res
  }

}
