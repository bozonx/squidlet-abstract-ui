import { IndexedEventEmitter } from 'squidlet-lib';
import BreadCrumbs from './BreadCrumbs.js';
import { Route, RouteDefinition } from '../types/Route.js';
import { ScreenComponent, ScreenDefinition } from './ScreenComponent.js';
import { AppSingleton } from '../AppSingleton.js';
export declare enum APP_ROUTER_EVENTS {
    change = 0,
    routesAdded = 1
}
export declare class AppRouter {
    readonly breadCrumbs: BreadCrumbs;
    readonly events: IndexedEventEmitter<import("squidlet-lib").DefaultHandler>;
    private routes;
    private currentRoute;
    private screensDefinitions;
    private readonly app;
    get isDestroyed(): boolean;
    get screen(): ScreenComponent;
    get route(): Route;
    /**
     * Get cleared current path without params
     */
    get path(): string;
    getBaseName(): string;
    getDirName(): string;
    get routeParams(): Record<string, any>;
    constructor(app: AppSingleton);
    init(routes?: RouteDefinition[], screensDefinitions?: ScreenDefinition[], initialPath?: string): void;
    destroy(): void;
    /**
     * Add some new routes to the top of routes array
     * @param routes
     */
    addRoutes(routes: RouteDefinition[]): void;
    push(pathTo: string): void;
    replace(route: Route): void;
    private onPathChanged;
    private resolveRouteByPath;
    private instantiateScreen;
    private makeStoreRoute;
}
