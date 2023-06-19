import {SuperItemInitDefinition} from 'squidlet-sprog'
import {ScreenDefinition} from '../routerBase/ScreenComponent.js';
import {RouteDefinition} from './Route.js';
import {ComponentDefinition} from './ComponentDefinition.js';


export interface AppDefinition extends Pick<ComponentDefinition,
  'ComponentClass' | 'state' | 'handlers' | 'tmpl'
  | 'onInit' | 'onMount' | 'onUnmount' | 'onDestroy' | 'onUpdate'
> {
  // custom components of libs of components
  components?: ComponentDefinition[]
  // these screens you can several times in routes
  screens?: ScreenDefinition[]

  routes?: RouteDefinition[]
  // definition of app.storage. If not defined then default {type: 'any'} will be used
  storage?: Record<string, SuperItemInitDefinition>

  // TODO: пользовательские настройки для приложения
}
