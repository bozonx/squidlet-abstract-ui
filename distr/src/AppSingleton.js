import { IndexedEventEmitter } from 'squidlet-lib';
import { SuperData } from 'squidlet-sprog';
import { RootComponent } from './RootComponent.js';
import { AppRouter } from './routerBase/AppRouter.js';
import { AppContext } from './AppContext.js';
const COMPONENT_EVENT_PREFIX = '|C|';
export var APP_EVENTS;
(function (APP_EVENTS) {
    APP_EVENTS[APP_EVENTS["initStarted"] = 0] = "initStarted";
    APP_EVENTS[APP_EVENTS["initFinished"] = 1] = "initFinished";
    // destroy started
    APP_EVENTS[APP_EVENTS["destroy"] = 2] = "destroy";
    // outcome event which has to be handled by external renderer
    APP_EVENTS[APP_EVENTS["render"] = 3] = "render";
    // ordinary income event
    APP_EVENTS[APP_EVENTS["income"] = 4] = "income";
})(APP_EVENTS = APP_EVENTS || (APP_EVENTS = {}));
/**
 * It is a context for components and whole app structure.
 * Think of this as one of instances for the same app and one of users.
 * This is the main and the only singleton for whole browser tab or application instance
 * or server side renderer.
 */
export class AppSingleton {
    events = new IndexedEventEmitter();
    root;
    router = new AppRouter(this);
    context = new AppContext(this);
    // global storage of application
    storage;
    main;
    get log() {
        return this.main.log;
    }
    constructor(main) {
        this.main = main;
        this.root = new RootComponent(this, this.main.componentsManager.appDefinition);
    }
    async init(initialPath) {
        this.events.emit(APP_EVENTS.initStarted);
        this.storage = (new SuperData(this.main.componentsManager.appDefinition.storage)).getProxy();
        this.storage.$super.init();
        this.router.init(this.main.componentsManager.appDefinition.routes, this.main.componentsManager.appDefinition.screens, initialPath);
        await this.root.init();
        // render root component
        await this.root.mount();
        this.events.emit(APP_EVENTS.initFinished);
    }
    async destroy() {
        this.events.emit(APP_EVENTS.destroy);
        await this.root.destroy();
        this.router.destroy();
        this.events.destroy();
    }
    /**
     * It is called from component to render an element
     * @param event
     * @param el
     */
    $$render(event, el) {
        this.events.emit(APP_EVENTS.render, event, el);
    }
    /**
     * Call it from outside code
     */
    emitIncomeEvent(event, componentId, params) {
        const incomeEvent = {
            name: event,
            params: params || {},
        };
        // emit ordinary event
        this.events.emit(APP_EVENTS.income, componentId, incomeEvent);
        // emit component specific event
        this.events.emit(this.makeIncomeEventName(componentId), incomeEvent);
    }
    getComponentDefinition = (componentName) => {
        return this.main.componentsManager.getComponentDefinition(componentName);
    };
    makeIncomeEventName(componentId) {
        return APP_EVENTS.income + COMPONENT_EVENT_PREFIX + componentId;
    }
}
