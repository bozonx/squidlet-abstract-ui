import { IndexedEventEmitter } from 'squidlet-lib';
import BreadCrumbs, { BREADCRUMBS_DELIMITER } from './BreadCrumbs.js';
import { ScreenComponent } from './ScreenComponent.js';
export var APP_ROUTER_EVENTS;
(function (APP_ROUTER_EVENTS) {
    // current route changed
    APP_ROUTER_EVENTS[APP_ROUTER_EVENTS["change"] = 0] = "change";
    // added some new routes
    APP_ROUTER_EVENTS[APP_ROUTER_EVENTS["routesAdded"] = 1] = "routesAdded";
})(APP_ROUTER_EVENTS = APP_ROUTER_EVENTS || (APP_ROUTER_EVENTS = {}));
export class AppRouter {
    breadCrumbs = new BreadCrumbs();
    events = new IndexedEventEmitter();
    routes = [];
    currentRoute;
    screensDefinitions = [];
    app;
    get isDestroyed() {
        return this.events.isDestroyed;
    }
    get screen() {
        return this.currentRoute.screen;
    }
    get route() {
        return this.currentRoute;
    }
    /**
     * Get cleared current path without params
     */
    get path() {
        return this.breadCrumbs.getCurrentPath();
    }
    getBaseName() {
        return this.breadCrumbs.getCurrentStep().name;
    }
    getDirName() {
        return this.breadCrumbs.getDirName();
    }
    get routeParams() {
        // TODO: зачем это??? есть же параметры route
        return this.breadCrumbs.getCurrentStep().params;
    }
    constructor(app) {
        this.app = app;
    }
    init(routes, screensDefinitions, initialPath = BREADCRUMBS_DELIMITER) {
        // TODO: запретить инициализировать повторно
        if (!routes || !routes.length)
            return;
        this.screensDefinitions = [...screensDefinitions || []];
        for (const routeDef of routes) {
            const [storeRoute, screenDef] = this.makeStoreRoute(routeDef);
            if (screenDef)
                this.screensDefinitions.push(screenDef);
            this.routes.push(storeRoute);
        }
        // TODO: review
        this.breadCrumbs.pathChangeEvent.addListener(this.onPathChanged);
        // TODO: review
        this.push(initialPath);
    }
    destroy() {
        // TODO: задестроить current screen
        this.routes = [];
        this.breadCrumbs.destroy();
        this.events.destroy();
    }
    /**
     * Add some new routes to the top of routes array
     * @param routes
     */
    addRoutes(routes) {
        for (const routeDef of routes) {
            const [storeRoute, screenDef] = this.makeStoreRoute(routeDef);
            if (screenDef)
                this.screensDefinitions.push(screenDef);
            this.routes.push(storeRoute);
        }
        this.events.emit(APP_ROUTER_EVENTS.routesAdded);
    }
    push(pathTo) {
        const storedRoute = this.resolveRouteByPath(pathTo);
        if (!storedRoute) {
            // TODO: to screen 404
            return;
        }
        const foundScreen = this.screensDefinitions.find((el) => {
            return el.name === storedRoute.screen;
        });
        if (!foundScreen)
            throw new Error(`Can't find screen`);
        this.currentRoute = {
            ...storedRoute,
            screen: this.instantiateScreen(foundScreen)
        };
        // TODO: при извлечении параметров очистить путь
        const clearPath = pathTo;
        // TODO: можно извлечь параметры из пути и передать их в breadcrumbs
        const pathParams = {};
        this.breadCrumbs.toPath(clearPath, pathParams);
        // TODO: поднять событие смены роута - событие есть и в breadcrumbs
    }
    replace(route) {
        // TODO: replace current route but don't change current path
    }
    onPathChanged = () => {
        (async () => {
            if (this.currentRoute?.screen) {
                await this.currentRoute?.screen.destroy();
            }
            // // TODO: нужно же брать уже готовый инстанс
            // // TODO: что ещё ему передать??
            // this.currentScreenInstance = new ScreenComponent(this.window)
            //
            // await this.currentScreenInstance.init()
        })()
            .catch((e) => {
            throw e;
            // TODO: что делать с ошибкой??
        });
    };
    resolveRouteByPath(pathTo) {
        return this.routes.find((el) => {
            // TODO: make smarter comparison
            if (el.path === pathTo)
                return true;
        });
    }
    instantiateScreen(scrDef) {
        return new ScreenComponent(this.app, 
        // TODO: на самом деле взять Route компонент, но как ???
        this.app.root, scrDef, 
        // TODO: слота не должно быть
        {});
    }
    makeStoreRoute(routeDef) {
        let screenName;
        let screenDef;
        if (typeof routeDef.screen === 'object') {
            screenDef = routeDef.screen;
            screenName = routeDef.screen.name;
        }
        else {
            screenName = routeDef.screen;
        }
        if (typeof screenName !== 'string') {
            throw new Error(`Can't resolve screen name`);
        }
        return [
            {
                path: routeDef.path,
                screen: screenName,
                params: routeDef.params,
            },
            screenDef
        ];
    }
}
