import { IndexedEventEmitter, Logger } from 'squidlet-lib';
import { ProxyfiedData } from 'squidlet-sprog';
import { AppSingleton } from './AppSingleton.js';
import { AppRouter } from './routerBase/AppRouter.js';
import { RootComponent } from './RootComponent.js';
export declare class AppContext {
    private app;
    get router(): AppRouter;
    get events(): IndexedEventEmitter;
    get log(): Logger;
    get root(): RootComponent;
    get storage(): ProxyfiedData;
    constructor(app: AppSingleton);
}
