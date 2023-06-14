import {
  newScope,
  SuperScope,
  SuperStruct,
  SuperArray,
  ProxyfiedStruct,
  ProxyfiedArray,
  SuperData,
  ProxyfiedData,
  ProxifiedSuperValue,
  SprogDefinition,
  SuperFunc
} from 'squidlet-sprog'
import {omitUndefined, makeUniqId, IndexedEventEmitter} from 'squidlet-lib'
import {CmpInstanceDefinition} from './types/CmpInstanceDefinition.js'
import {INCOME_EVENTS, IncomeEvent} from './types/IncomeEvent.js'
import {RenderedElement} from './types/RenderedElement.js'
import {ComponentSlotsManager, SlotsDefinition} from './ComponentSlotsManager.js'
import {COMPONENT_ID_BYTES_NUM} from './types/constants.js'
import {AppSingleton} from './AppSingleton.js'
import {makeComponentUiParams, parseCmpInstanceDefinition, renderComponentBase} from './helpers/componentHelper.js';
import {ComponentDefinition} from './types/ComponentDefinition.js';
import {AppContext} from './AppContext.js';
import {ScreenComponent} from './routerBase/ScreenComponent.js';
import {RenderEvents} from './types/RenderEvents.js';


// TODO: внимательно продумать unmount и destroy
// TODO: продумать связь props с потомками компонента
// TODO: дети поднимают события наверх, на которые явно подписались в шаблоне
//       хотя можно явно вызывать у родителя, а он уже будет отсеивать
// TODO: если компонент отмонтирован то он должен перестать генерировать события вверх
//       и перестать слушать props все другие события

// TODO: поддержка перемещения элементов - добавить в SuperArray
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


/**
 * Scope for executing sprog
 */
export interface ComponentScope {
  app: AppContext
  // screen which is rendered by router
  screen?: ScreenComponent
  // own props
  props: ProxyfiedStruct
  // own state
  state: ProxyfiedData
  component: Component
  // any other variables
  [index: string]: any
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
  // local state of component instance
  protected readonly state: ProxyfiedData
  // It is scope for template runtime
  protected readonly scope: ComponentScope & SuperScope
  private incomeEventListenerIndex?: number
  private initialProps: Record<string, any>


  /**
   * component name. The same as in template and component definition
   */
  get name(): string {
    return this.componentDefinition.name
  }

  get mounted(): boolean {
    return typeof this.incomeEventListenerIndex !== 'undefined'
  }

  get screen(): ScreenComponent | undefined {
    return this.parent && this.parent.screen
  }


  protected constructor(
    app: AppSingleton,
    parent: Component,
    // definition component itself
    componentDefinition: ComponentDefinition,
    initialProps: Record<string, any>,
    // slots of component which get from parent component template
    slotsDefinition?: SlotsDefinition
  ) {
    this.app = app
    this.parent = parent
    this.componentDefinition = componentDefinition
    this.initialProps = initialProps
    this.id = this.makeId()
    this.slots = new ComponentSlotsManager(slotsDefinition)
    this.props = (new SuperStruct(componentDefinition.props || {}, true)).getProxy()
    this.state = (new SuperData(componentDefinition.state)).getProxy()
    this.scope = newScope<ComponentScope>({
      get props() {
        return this.props
      },
      get state() {
        return this.state
      },
      get slots() {
        return this.slots
      },
      get app() {
        return this.app.context
      },
      screen: this.screen,
      component: this,
    })
    // TODO: а изменения порядка children через него будет или через отдельные методы?
    // TODO: если через него то надо слушать его события чтобы отрисовывать изменение порядка
    this.children = (new SuperArray({
      // TODO: поидее надо тип Component
      type: 'object',
      readonly: false,
      nullable: false,
    })).getProxy()
  }


  async init() {
    this.events.emit(COMPONENT_EVENTS.initStart)

    this.props.subscribe((target: ProxifiedSuperValue, path?: string) => {
      // TODO: слушать изменения props
    })
    this.state.subscribe((target: ProxifiedSuperValue, path?: string) => {
      // TODO: слушать изменения state
    })
    this.children.subscribe((target: ProxifiedSuperValue, path?: string) => {
      // TODO: слушать изменения children
    })

    // TODO: родитель должен понять что ребенок дестроится и разорвать связь у себя
    //       и удалить его у себя

    // TODO: а если там указанны super значения, а в definition простые?
    this.$$propsSetter = this.props.$super.init(this.initialProps)

    this.state.$super.init()
    this.children.$super.init(this.instantiateChildren())

    // init all the children components
    for (const childIndex of this.children.$super.allKeys) {
      // child is component
      await this.children[childIndex].init()

      // TODO: надо начать слушать события детей которые они поднимают наверх
    }

    this.events.emit(COMPONENT_EVENTS.initFinished)

    if (this.componentDefinition.onInit) {
      await this.runSprogCallback(this.componentDefinition.onInit)
    }
  }

  /**
   * Destroy my and all the my children.
   * It will not rise unmount. You have to listen destroying component to totaly
   * remove it. And umount means that component doesn't remove from memory.
   */
  async destroy(allowRender: boolean = true) {
    if (this.componentDefinition.onDestroy) {
      await this.runSprogCallback(this.componentDefinition.onDestroy)
    }

    this.events.emit(COMPONENT_EVENTS.destroy)
    this.events.destroy()
    this.stopListenIncomeEvents()

    // destroy all the children without emitting render events
    for (const component of this.children) await component.destroy(false)

    await this.slots.destroy()
    this.children.$super.destroy()
    this.scope.$super.destroy()
    // props and state are destroyed as scope children
    // emit component destroy event
    if (allowRender) {
      this.app.$$render(RenderEvents.destroy, renderComponentBase(this))
    }
  }


  /**
   * Mount this component's element.
   * Actually means emit mount event and listen element's income events.
   */
  async mount(allowRender: boolean = true) {
    if (this.componentDefinition.onMount) {
      await this.runSprogCallback(this.componentDefinition.onMount)
    }
    // start listening income events
    this.incomeEventListenerIndex = this.app.events.addListener(
      this.app.makeIncomeEventName(this.id),
      this.handleIncomeEvent
    )
    // mount child always silent
    for (const child of this.children) await child.mount(false)

    if (allowRender) this.app.$$render(RenderEvents.mount, this.render())

    this.events.emit(COMPONENT_EVENTS.mounted)
  }

  /**
   * Unmount this component's element.
   * Means stop listenint ui change events and But the component won't be destroyed
   */
  async unmount(allowRender: boolean = true) {
    if (this.componentDefinition.onUnmount) {
      await this.runSprogCallback(this.componentDefinition.onUnmount)
    }

    this.stopListenIncomeEvents()

    // unmount child always silent
    for (const child of this.children) await child.unmount(false)

    if (allowRender) this.app.$$render(RenderEvents.unMount, renderComponentBase(this))

    this.events.emit(COMPONENT_EVENTS.unmounted)
  }

  /**
   * Get position of child by its component id.
   * -1 means - can't find child
   */
  getIndexOfChild(childComponentId: string): number {
    return this.children.findIndex((el) => el.id === childComponentId)
  }

  /**
   * Make full render element with children
   */
  render(): RenderedElement {
    return omitUndefined({
      ...this.renderSelf(),
      children: this.renderChildren(),
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


  /**
   * Handle event which income from frontend.
   * It will call corresponding event handler.
   * @param event
   * @param args
   */
  private handleIncomeEvent = (event: IncomeEvent) => {
    (async () => {

      // TODO: если так посмотреть то мы изначально знаем и имена параметров и из
      //       definition, так как на каждое событие определенный вызов ф-и
      //       получается надо просто дать возможность переименовать параметры
      //       и установить значения по умолчанию

      // TODO: сделать bubbling если нет preventBubbling

      const funcDefinition = this.componentDefinition
        ?.handlers?.[eventName]

      if (!funcDefinition) return

      // TODO: надо вызвать OrderedFunc, можно через scope.run

      //await scope.run(this.componentDefinition.handlers.click)
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
  private instantiateChild(childInstanceDefinition: CmpInstanceDefinition): Component {
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

  private renderChildren(): RenderedElement[] | undefined {
    const res: RenderedElement[] = this.children
      .map((child) => child.render())

    return (res.length) ? res : undefined
  }

  private async runSprogCallback(lines: SprogDefinition[]) {
    const superFunc = new SuperFunc(this.scope, {}, lines)

    await superFunc.exec()
  }

  private stopListenIncomeEvents() {
    this.app.events.removeListener(
      this.incomeEventListenerIndex,
      this.app.makeIncomeEventName(this.id)
    )

    delete this.incomeEventListenerIndex
  }

}
