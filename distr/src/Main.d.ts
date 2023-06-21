import { IndexedEventEmitter, Logger } from 'squidlet-lib';
import { AppSingleton } from './AppSingleton.js';
import { AbstractUiPackage } from './types/types.js';
import { ComponentsManager } from './ComponentsManager.js';
import { MainConfig } from './types/MainConfig.js';
import { AppDefinition } from './types/AppDefinition.js';
export declare enum SYSTEM_EVENTS {
    initStarted = 0,
    initFinished = 1,
    destroyStarted = 2,
    newApp = 3
}
/**
 * Think of it as this is main process which is started on system.
 * And AppSingleton is a one of subprocess for each instance of each user and his
 * browser tab or application instance
 */
export declare class Main {
    readonly systemEvents: IndexedEventEmitter<import("squidlet-lib").DefaultHandler>;
    log: Logger;
    readonly componentsManager: ComponentsManager;
    readonly config: MainConfig;
    app: AppSingleton;
    private readonly packageManager;
    constructor(config?: Partial<MainConfig>);
    init(): Promise<void>;
    destroy(): Promise<void>;
    setLogger(logger: Logger): void;
    registerRouter(): void;
    use(pkg: AbstractUiPackage): void;
    /**
     * Set Application definition
     * * components witch are used
     * * router config
     * * application config
     * * root template
     * @param appDefinition
     */
    setApp(appDefinition: AppDefinition): void;
}
