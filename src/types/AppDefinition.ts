import {ScreenDefinition} from '../routerBase/ScreenComponent.js';
import {RouteDefinition} from './Route.js';
import {ComponentDefinition} from './ComponentDefinition.js';


export interface AppDefinition extends Pick<ComponentDefinition, 'tmpl' | 'state'> {
  // TODO: сюда пользователь может вставлять либы компонентов
  // it is just app's components lib
  components?: ComponentDefinition[]
  // these screens you can several times in routes
  screens?: ScreenDefinition[]

  routes?: RouteDefinition[]

  // TODO: пользовательские настройки для приложения
}
