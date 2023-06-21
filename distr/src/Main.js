import { IndexedEventEmitter, ConsoleLogger } from 'squidlet-lib';
import { AppSingleton } from './AppSingleton.js';
import { PackageManager } from './PackageManager.js';
import { ComponentsManager } from './ComponentsManager.js';
import { MAIN_CONFIG_DEFAULTS } from './types/MainConfig.js';
export var SYSTEM_EVENTS;
(function (SYSTEM_EVENTS) {
    SYSTEM_EVENTS[SYSTEM_EVENTS["initStarted"] = 0] = "initStarted";
    SYSTEM_EVENTS[SYSTEM_EVENTS["initFinished"] = 1] = "initFinished";
    SYSTEM_EVENTS[SYSTEM_EVENTS["destroyStarted"] = 2] = "destroyStarted";
    SYSTEM_EVENTS[SYSTEM_EVENTS["newApp"] = 3] = "newApp";
})(SYSTEM_EVENTS = SYSTEM_EVENTS || (SYSTEM_EVENTS = {}));
/**
 * Think of it as this is main process which is started on system.
 * And AppSingleton is a one of subprocess for each instance of each user and his
 * browser tab or application instance
 */
export class Main {
    systemEvents = new IndexedEventEmitter();
    log;
    componentsManager = new ComponentsManager(this);
    config;
    // TODO: а вообще имеет смысл делать несколько apps ???
    app;
    packageManager = new PackageManager(this);
    constructor(config = {}) {
        this.config = {
            ...MAIN_CONFIG_DEFAULTS,
            ...config,
        };
        // TODO: а оно надо? можно же слушать события логера
        this.log = new ConsoleLogger((this.config.debug) ? 'debug' : this.config.logLevel);
    }
    async init() {
        this.systemEvents.emit(SYSTEM_EVENTS.initStarted);
        this.app = new AppSingleton(this);
        this.systemEvents.emit(SYSTEM_EVENTS.newApp, this.app);
        // TODO: поддержка initialPath
        await this.app.init();
        this.systemEvents.emit(SYSTEM_EVENTS.initFinished);
    }
    async destroy() {
        this.systemEvents.emit(SYSTEM_EVENTS.destroyStarted);
        this.systemEvents.destroy();
        await this.app.destroy();
    }
    // TODO: впринципе не нужно, логгер можно просто слушать события логера
    setLogger(logger) {
        this.log = logger;
    }
    registerRouter() {
        // TODO: может тоже внешне подключать - слушать события роутера - push, replace
        // TODO: хотя роутер то должен быть один всего
        // TODO: add - регистрировать базу на систему
        // TODO: но его инстанс должен создаваться в AppSingleton
    }
    use(pkg) {
        this.packageManager.use(pkg);
    }
    /**
     * Set Application definition
     * * components witch are used
     * * router config
     * * application config
     * * root template
     * @param appDefinition
     */
    setApp(appDefinition) {
        this.componentsManager.registerApp(appDefinition);
    }
}
