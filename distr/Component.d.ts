import { SuperScope, ProxyfiedStruct, ProxyfiedArray, ProxyfiedData } from 'squidlet-sprog';
import { IndexedEventEmitter } from 'squidlet-lib';
import { IncomeEvent } from './types/IncomeEvent.js';
import { RenderedElement } from './types/RenderedElement.js';
import { AppSingleton } from './AppSingleton.js';
import { ComponentDefinition } from './types/ComponentDefinition.js';
import { AppContext } from './AppContext.js';
import { ScreenComponent } from './routerBase/ScreenComponent.js';
import { SlotsDefinition } from './stdLib/Slot.js';
export declare enum COMPONENT_EVENTS {
    initStart = 0,
    initFinished = 1,
    mounted = 2,
    unmounted = 3,
    update = 4,
    destroy = 5
}
/**
 * Scope for executing sprog
 */
export interface ComponentScope {
    app: AppContext;
    screen?: ScreenComponent;
    props: ProxyfiedStruct;
    state: ProxyfiedData;
    component: Component;
    [index: string]: any;
}
export type FullComponentScope = ComponentScope & SuperScope;
/**
 * All the items of Abstract UI are components or inherit it.
 * Each UI element which is sent to renderer is component, but renderer can
 * render it as several elements if needs, but it actually doesn't matter.
 */
export declare class Component {
    readonly isRoot: boolean;
    readonly id: string;
    readonly events: IndexedEventEmitter<import("squidlet-lib").DefaultHandler>;
    readonly children: ProxyfiedArray<Component>;
    readonly parent: Component;
    readonly scopeComponent?: Component;
    readonly props: ProxyfiedStruct;
    readonly slotsDefinition?: SlotsDefinition;
    readonly state: ProxyfiedData;
    readonly scope: FullComponentScope;
    $$propsSetter: (name: string, value: any) => void;
    protected readonly app: AppSingleton;
    protected readonly componentDefinition: ComponentDefinition;
    private incomeEventListenerIndex?;
    readonly initialProps: Record<string, any>;
    private lastRender?;
    private slotParams;
    /**
     * component name. The same as in template and component definition
     */
    get name(): string;
    get mounted(): boolean;
    get screen(): ScreenComponent | undefined;
    constructor(app: AppSingleton, parent: Component, componentDefinition: ComponentDefinition, initialProps: Record<string, any>, slotsDefinition?: SlotsDefinition, scopeComponent?: Component);
    init(): Promise<void>;
    /**
     * Destroy my and all the my children.
     * It will not rise unmount. You have to listen destroying component to totaly
     * remove it. And umount means that component doesn't remove from memory.
     */
    destroy(allowRender?: boolean): Promise<void>;
    $$registerSlotParamsScope(slotName: string, slotScope: SuperScope): void;
    /**
     * Emit custom event to scopeComponent
     */
    emit: (eventName: string, params: Record<string, any>) => void;
    /**
     * Mount this component's element.
     * Actually means emit mount event and listen element's income events.
     */
    mount(allowRender?: boolean): Promise<void>;
    /**
     * Unmount this component's element.
     * Means stop listenint ui change events and But the component won't be destroyed
     */
    unmount(allowRender?: boolean): Promise<void>;
    /**
     * Get position of child by its component id.
     * -1 means - can't find child
     */
    getIndexOfChild(childComponentId: string): number;
    /**
     * Make full render element with children
     */
    render(): RenderedElement;
    /**
     * Make render element only for itself without children
     */
    renderSelf(): RenderedElement;
    /**
     * Handle event which income from frontend or other custom events from components
     * It will call corresponding event handler which is set in component definition.
     * @param event
     */
    incomeEvent: (event: IncomeEvent) => void;
    /**
     * This is called from parent on any chage of scoped component
     */
    handlePropsChange(scopedComponent: Component): Promise<void>;
    tick(): Promise<void>;
    protected makeId(): string;
    protected instantiateChildrenComponents(): Component[];
    /**
     * This is called on any change of props, state or children array
     * @private
     */
    private handleAnyChange;
    private renderChildren;
    private runSprogCallback;
    private stopListenIncomeEvents;
}
