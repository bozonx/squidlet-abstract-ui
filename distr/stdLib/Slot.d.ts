import { ComponentDefinition } from '../types/ComponentDefinition.js';
import { CmpInstanceDefinition } from '../types/CmpInstanceDefinition.js';
export interface SlotsDefinition {
    default?: CmpInstanceDefinition[];
    [index: string]: CmpInstanceDefinition[] | undefined;
}
export declare const Slot: ComponentDefinition;
