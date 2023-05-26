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
} from 'squidlet-sprog';
import {omitObj, makeUniqId} from 'squidlet-lib';
import {CmpInstanceDefinition} from './types/CmpInstanceDefinition.js';
import {IncomeEvents, OutcomeEvents} from './types/DomEvents.js';
import {RenderedElement} from './types/RenderedElement.js';
import {ComponentSlotsManager, SlotsDefinition} from './ComponentSlotsManager.js';
import {COMPONENT_ID_BYTES_NUM} from './types/constants.js';
import {AppSingleton, COMPONENT_EVENT_PREFIX} from './AppSingleton.js';


// TODO: поддержка перемещения элементов - добавить в SuperArray

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



export class Component {
  readonly isRoot: boolean = false
  // componentId
  readonly id: string
  // Not ordered children components. Like {componentId: Component}
  //readonly children: Record<string, Component> = {}
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
    await this.instantiateChildren()

    // TODO: run onInit callback

    // init all the children components
    for (const component of this.children) await component.init()
  }

  async destroy() {
    this.app.incomeEvents.removeListener(this.incomeEventListenerIndex)

    for (const component of this.children) await component.destroy()

    this.children.$super.destroy()
    await this.slots.destroy()
    // TODO: родитель должен понять что ребенок дестроится и разорвать связь у себя
    //       и удалить его у себя
    this.props.$super.destroy()
    this.state.$super.destroy()
  }


  // TODO: а это нужно ???
  /**
   * Get position of child by its UI el id.
   * -1 means - can't find child
   */
  getPositionOfChildrenEl(childrenElId: string): number {
    return this.childrenPosition.indexOf(childrenElId)
  }

  // TODO: review
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

    for (const childId of Object.keys(this.children)) {
      // mount child always silent
      await this.children[childId].mount(true)
    }
  }

  // TODO: review
  /**
   * Unmount this component's element.
   * Means stop listenint ui change events and But the component won't be destroyed
   */
  async unmount(silent: boolean = false) {
    // stop listening income events
    this.app.incomeEvents.removeListener(this.incomeEventListenerIndex)

    for (const childId of Object.keys(this.children)) {
      // unmount child always silent
      await this.children[childId].unmount(true)
    }

    if (!silent) {
      this.app.outcomeEvents.emit(OutcomeEvents.unMount, this.makeRenderedEl())
    }
  }

  // async update() {
  //
  //
  //
  //   this.main.outcomeEvents.emit(OutcomeEvents.update, this.renderSelf())
  // }

  // TODO: review
  /**
   * Make render element only for itself without children
   */
  renderSelf(): RenderedElement {
    return {
      ...this.makeRenderedEl(),
      params: this.getUiParams(),
    }
  }

  // TODO: review
  /**
   * Make full render element with children
   */
  render(): RenderedElement {
    return {
      ...this.renderSelf(),
      children: this.getChildrenUiEls(),
    }
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
      // TODO: put to main logger
      .catch(console.error)
  }

  private async instantiateChildren() {
    // If component have tmpl then get child from it - it is default behaviour
    if (this.componentDefinition.tmpl) {
      for (const child of this.componentDefinition.tmpl) {
        await this.instantiateChild(child)
      }
    }
    // if component doesn't have a tmpl then just render default slot like it is tmpl
    else {
      for (const child of this.slots.getDefaultDefinition() || []) {
        await this.instantiateChild(child)
      }
    }
    // if not - so not one children then
  }

  async instantiateChild(childTmplDefinition: CmpInstanceDefinition) {
    const {
      componentDefinition,
      slotDefinition,
      props,
    } = this.prepareChild(childTmplDefinition)

    //console.log(1111, childUiDefinition, componentDefinition, slotDefinition, props)

    const childComponent = new Component(
      this.app,
      this,
      componentDefinition,
      slotDefinition,
      props
    )

    this.children.push(childComponent)
  }

  // TODO: review
  private prepareChild(childUiDefinition: CmpInstanceDefinition): {
    componentName: string
    propsValues: Record<string, any>
    slotDefinition: SlotsDefinition
    componentDefinition: ComponentDefinition
    props: ProxyfiedStruct
    propSetter: (pathTo: string, newValue: any) => void
  } {
    const componentName: string = childUiDefinition.component
    // values of child props which are set in this (parent) component
    const propsValues: Record<string, any> = omitObj(childUiDefinition, 'component', 'slot')
    const componentDefinition = this.app.getComponentDefinition(componentName)
    // TODO: use proxy
    const props = new SuperStruct(
      // if no props then put just empty props
      componentDefinition.props || {},
      // props are readonly by default
      true
    )
    const propSetter = props.init(propsValues)
    let slotDefinition: SlotsDefinition = {}

    if (Array.isArray(childUiDefinition.slot)) {
      slotDefinition = {
        default: childUiDefinition.slot
      }
    }
    else if (typeof childUiDefinition.slot === 'object') {
      slotDefinition = childUiDefinition.slot
    }

    // TODO: в childPropsValues как примитивы, так и sprog - надо его выполнить наверное
    // TODO: props должен быть связан с текущим компонентом
    // TODO: propSetter надо сохранить себе чтобы потом устанавливать значения

    return {
      componentName,
      propsValues,
      slotDefinition,
      componentDefinition,
      props,
      propSetter,
    }
  }

  // TODO: review
  private makeRenderedEl(): RenderedElement {
    const baseParams = {
      name: this.name,
      componentId: this.id,
    }

    if (this.isRoot) {
      return {
        ...baseParams,
        parentId: '',
        parentChildPosition: -1,
      }
    }
    else {
      // not root means it is Component. It has to have parent
      const cmpParent: Component = this.parent!

      return {
        ...baseParams,
        parentId: cmpParent.id,
        parentChildPosition: cmpParent.getPositionOfChildrenEl(this.id),
      }
    }
  }

  // TODO: review
  private getChildrenUiEls(): RenderedElement[] | undefined {
    const res: RenderedElement[] = []

    for (const childComponentId of this.childrenPosition) {
      res.push(this.children[childComponentId].render())
    }

    if (!res.length) return

    return res
  }

  // TODO: review
  private getUiParams(): Record<string, any> | undefined {
    if (!this.componentDefinition.uiParams) return

    const res: Record<string, any> = {}

    for (const item of this.componentDefinition.uiParams) {
      if (typeof item === 'string') {
        if (this.state.hasKey(item)) {
          // TODO: учитывай что getValue принимает deepPath
          res[item] = this.state.getValue(item)
        }
        else if (this.props.hasKey(item)) {
          res[item] = this.props.getValue(item)
        }
      }
      else {
        // means [string, () => any]
        res[item[0]] = item[1]()
      }
    }

    if (!Object.keys(res).length) return

    return res
  }

}
