import { SuperItemInitDefinition, ProxyfiedData } from 'squidlet-sprog';
import { Component } from '../Component.js';
import { ComponentDefinition } from '../types/ComponentDefinition.js';
import { AppSingleton } from '../AppSingleton.js';
import { Route } from '../types/Route.js';
import { SlotsDefinition } from '../stdLib/Slot.js';
export interface ScreenDefinition extends ComponentDefinition {
    /**
     * This is storage of screen which can be accessed by any deep child
     */
    storage?: Record<string, SuperItemInitDefinition>;
}
export declare class ScreenComponent extends Component {
    readonly isScreen: boolean;
    readonly storage: ProxyfiedData;
    get route(): Route;
    get screen(): ScreenComponent | undefined;
    constructor(app: AppSingleton, parent: Component, screenDefinition: ScreenDefinition, slotsDefinition: SlotsDefinition);
    init(): Promise<void>;
    destroy(allowRender?: boolean): Promise<void>;
}
