import {SuperStruct, newScope, SuperItemDefinition} from 'squidlet-sprog';
import {Component, ComponentDefinition} from './Component.js';
import {AppSingleton} from './AppSingleton.js';
import {CmpInstanceDefinition} from './types/CmpInstanceDefinition.js';


export const ROOT_COMPONENT_ID = 'root'
export const ROOT_COMPONENT_NAME = 'root'


export class RootComponent extends Component {
  readonly isRoot: boolean = true


  constructor(
    app: AppSingleton,
    tmpl?: CmpInstanceDefinition[],
    state?: Record<string, SuperItemDefinition>
  ) {

    // TODO: это должно быть в init, либо сам root в app.init()
    const componentDefinition: ComponentDefinition = app
      .getComponentDefinition(ROOT_COMPONENT_ID)
    // root component doesn't have parent
    const parent = null as any
    const propsStub = new SuperStruct({}).getProxy()

    // TODO: Это всё vvv делать в AppSingleton а RootComponent почти обычный компонент
    // TODO: надо зарегать все components
    // TODO: надо зарегать все screens
    // TODO: надо зарегать конфиг приложения


    // TODO: сохранить до момента пока будут создавать app
    // const rootComponentDefinition: ComponentDefinition = {
    //   name: ROOT_COMPONENT_NAME,
    //   props: new SuperStruct({}).getProxy(),
    //   state: appDefinition.state,
    //   tmpl: appDefinition.tmpl,
    // }
    //
    //
    // this.componentsManager.registerComponents({
    //   [ROOT_COMPONENT_ID]: rootComponent as any
    // })

    //const rootCmp = new RootComponent()

    //this.componentsManager.registerRoot(rootComponent)

    super(app, parent, componentDefinition, {}, propsStub)
  }

  get name(): string {
    return ROOT_COMPONENT_NAME
  }

  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
