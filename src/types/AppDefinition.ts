import {ComponentDefinition} from '../Component.js';
import {ScreenDefinition} from '../routerBase/Screen.js';


export interface AppDefinition extends Pick<ComponentDefinition, 'tmpl' | 'state'> {
  // TODO: сюда пользователь может вставлять либы компонентов
  // it is just app's components lib
  components?: ComponentDefinition[]
  // it is just app's screens lib
  //screens?: ScreenDefinition[]

  // TODO: настройка роутера
  // TODO: пользовательские настройки для приложения
}
