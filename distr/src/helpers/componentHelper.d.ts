import { ProxyfiedStruct, ProxyfiedData } from 'squidlet-sprog';
import { CmpInstanceDefinition } from '../types/CmpInstanceDefinition.js';
import { Component } from '../Component.js';
import { RenderedElement } from '../types/RenderedElement.js';
import { ComponentDefinition } from '../types/ComponentDefinition.js';
import { AppSingleton } from '../AppSingleton.js';
import { SlotsDefinition } from '../stdLib/Slot.js';
export declare function parseCmpInstanceDefinition(instanceDefinition: CmpInstanceDefinition): {
    componentName: string;
    propsValues: Record<string, any>;
    slotDefinition: SlotsDefinition;
};
/**
 * Make instances of my direct children
 * @private
 */
export declare function instantiateChildComponent(childInstanceDefinition: CmpInstanceDefinition, app: AppSingleton, parent: Component, scopeComponent: Component): Component;
/**
 * Render base parameters of a component without params and children
 * @param cmp
 */
export declare function renderComponentBase(cmp: Component): RenderedElement;
export declare function makeComponentUiParams(componentDefinition: ComponentDefinition, props: ProxyfiedStruct, state: ProxyfiedData): Record<string, any> | undefined;
export declare function validateComponentDefinition(cmp: ComponentDefinition): void;
