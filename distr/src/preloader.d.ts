import { ComponentDefinition } from './Component.js';
/**
 * Loads all the components which are imported in root component and other components.
 * And return {pathToFileRelativeRootComponent: ComponentDefinition}
 */
export declare function preloader(rootComponentYamlPath: string, loader: (pathTo: string) => Promise<string>): Promise<Record<string, ComponentDefinition>>;
