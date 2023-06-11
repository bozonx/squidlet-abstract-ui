import {SuperStruct, newScope} from 'squidlet-sprog';
import {Component, ComponentDefinition} from './Component.js';
import {AppSingleton} from './AppSingleton.js';
import {ScreenDefinition} from './routerBase/Screen.js';


export interface RootComponentDefinition extends Pick<ComponentDefinition, 'tmpl' | 'state'> {
  // TODO: сюда пользователь может вставлять либы компонентов
  // it is just app's components lib
  components?: ComponentDefinition[]
  // it is just app's screens lib
  screens?: ScreenDefinition[]

  // TODO: настройка роутера
  // TODO: пользовательские настройки для приложения
}


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
