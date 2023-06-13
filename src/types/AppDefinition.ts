import {ScreenDefinition} from '../Screen.js';
import {Route} from './Route.js';
import {ComponentDefinition} from './ComponentDefinition.js';


export interface AppDefinition extends Pick<ComponentDefinition, 'tmpl' | 'state'> {
  // TODO: сюда пользователь может вставлять либы компонентов
  // it is just app's components lib
  components?: ComponentDefinition[]
  // these screens you can several times in routes
  screens?: ScreenDefinition[]

  routes?: Route[]

  // TODO: пользовательские настройки для приложения
}
