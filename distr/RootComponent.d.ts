import { Component } from './Component.js';
import { AppSingleton } from './AppSingleton.js';
import { AppDefinition } from './types/AppDefinition.js';
export declare const ROOT_COMPONENT_ID = "root";
export declare const ROOT_COMPONENT_NAME = "Root";
export declare class RootComponent extends Component {
    readonly isRoot: boolean;
    constructor(app: AppSingleton, appDefinition: AppDefinition);
    protected makeId(): string;
}
