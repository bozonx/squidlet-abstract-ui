import { omitObj } from 'squidlet-lib';
import yaml from 'yaml';
import { STD_COMPONENTS } from './stdLib/index.js';
import { validateComponentDefinition } from './helpers/componentHelper.js';
export class ComponentsManager {
    appDefinition;
    main;
    // Components of registered libs and user defined. like: {componentName: ComponentDefinition}
    components = {};
    constructor(main) {
        this.main = main;
        this.registerComponents(STD_COMPONENTS);
    }
    getComponentDefinition(componentName) {
        if (!this.components[componentName]) {
            throw new Error(`Can't find component "${componentName}"`);
        }
        return this.components[componentName];
    }
    registerApp(appDefinition) {
        if (this.appDefinition)
            throw new Error(`Can't replace the app definition`);
        // register components from definition
        if (appDefinition.components)
            this.registerComponents(appDefinition.components);
        // save app definition without components
        this.appDefinition = omitObj(appDefinition, 'components');
    }
    registerComponents(components) {
        for (const cmp of components) {
            let resolvedComponentDef;
            if (typeof cmp === 'string') {
                resolvedComponentDef = yaml.parse(cmp);
            }
            else if (typeof cmp === 'object') {
                resolvedComponentDef = cmp;
            }
            else {
                throw new Error(`Unknown type of component "${typeof cmp}"`);
            }
            validateComponentDefinition(resolvedComponentDef);
            this.components[resolvedComponentDef.name] = resolvedComponentDef;
        }
    }
}
