import { Main } from './Main.js';
import { AppDefinition } from './types/AppDefinition.js';
import { ComponentDefinition } from './types/ComponentDefinition.js';
export declare class ComponentsManager {
    appDefinition: AppDefinition;
    private readonly main;
    private readonly components;
    constructor(main: Main);
    getComponentDefinition(componentName: string): ComponentDefinition;
    registerApp(appDefinition: AppDefinition): void;
    registerComponents(components: (string | ComponentDefinition)[]): void;
}
