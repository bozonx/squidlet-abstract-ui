import { SuperItemInitDefinition, SprogDefinition, SuperFuncDefinition } from 'squidlet-sprog';
import { CmpInstanceDefinition } from './CmpInstanceDefinition.js';
import { Component } from '../Component.js';
export interface ComponentDefinition {
    name: string;
    childless?: boolean;
    ComponentClass?: typeof Component;
    props?: Record<string, SuperItemInitDefinition>;
    state?: Record<string, SuperItemInitDefinition>;
    uiParams?: (string | [string, () => any])[];
    handlers?: Record<string, SuperFuncDefinition>;
    tmpl?: CmpInstanceDefinition[];
    onInit?: SprogDefinition[];
    onMount?: SprogDefinition[];
    onUnmount?: SprogDefinition[];
    onDestroy?: SprogDefinition[];
    onUpdate?: SprogDefinition[];
}
