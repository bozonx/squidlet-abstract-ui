import { ScreenComponent, ScreenDefinition } from '../routerBase/ScreenComponent.js';
export interface RouteBase {
    path: string;
    params?: Record<string, any>;
}
export interface RouteDefinition extends RouteBase {
    screen: string | ScreenDefinition;
}
export interface Route extends RouteBase {
    screen: ScreenComponent;
}
