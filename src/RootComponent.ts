import {SuperStruct, newScope} from 'squidlet-sprog';
import {Component, ComponentDefinition} from './Component.js';
import {AppSingleton} from './AppSingleton.js';


export const ROOT_COMPONENT_ID = 'root'
export const ROOT_COMPONENT_NAME = 'root'


export class RootComponent extends Component {
  readonly isRoot: boolean = true


  constructor(app: AppSingleton) {

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

    super(app, parent, componentDefinition, {}, propsStub)
  }

  get name(): string {
    return ROOT_COMPONENT_NAME
  }

  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
