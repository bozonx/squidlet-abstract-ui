import { SuperItemInitDefinition } from 'squidlet-sprog';
import { ScreenDefinition } from '../routerBase/ScreenComponent.js';
import { RouteDefinition } from './Route.js';
import { ComponentDefinition } from './ComponentDefinition.js';
export interface AppDefinition extends Pick<ComponentDefinition, 'ComponentClass' | 'state' | 'handlers' | 'tmpl' | 'onInit' | 'onMount' | 'onUnmount' | 'onDestroy' | 'onUpdate'> {
    components?: ComponentDefinition[];
    screens?: ScreenDefinition[];
    routes?: RouteDefinition[];
    storage?: Record<string, SuperItemInitDefinition>;
}
