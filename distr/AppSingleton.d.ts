import { IndexedEventEmitter, Logger } from 'squidlet-lib';
import { ProxyfiedData } from 'squidlet-sprog';
import { Main } from './Main.js';
import { RootComponent } from './RootComponent.js';
import { IncomeEvent } from './types/IncomeEvent.js';
import { RenderedElement } from './types/RenderedElement.js';
import { AppRouter } from './routerBase/AppRouter.js';
import { ComponentDefinition } from './types/ComponentDefinition.js';
import { AppContext } from './AppContext.js';
import { RenderEvents } from './types/RenderEvents.js';
/**
 * It is a context for components and whole app structure.
 * Think of this as one of instances for the same app and one of users.
 * This is the main and the only singleton for whole browser tab or application instance
 * or server side renderer.
 */
export declare class AppSingleton {
    readonly events: IndexedEventEmitter<import("squidlet-lib").DefaultHandler>;
    readonly root: RootComponent;
    readonly router: AppRouter;
    readonly context: AppContext;
    storage: ProxyfiedData;
    private readonly main;
    get log(): Logger;
    constructor(main: Main);
    init(initialPath?: string): Promise<void>;
    destroy(): Promise<void>;
    /**
     * It is called from component to render an element
     * @param event
     * @param el
     */
    $$render(event: RenderEvents, el: RenderedElement): void;
    /**
     * Call it from outside code
     */
    emitIncomeEvent(event: IncomeEvent['name'], componentId: string, params?: Record<string, any>): void;
    getComponentDefinition: (componentName: string) => ComponentDefinition;
    makeIncomeEventName(componentId: string): string;
}
