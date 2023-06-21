import { pickObj } from 'squidlet-lib';
import { Component } from './Component.js';
export const ROOT_COMPONENT_ID = 'root';
export const ROOT_COMPONENT_NAME = 'Root';
export class RootComponent extends Component {
    isRoot = true;
    constructor(app, appDefinition) {
        // root component doesn't have parent
        const parent = null;
        const componentDefinition = {
            name: ROOT_COMPONENT_NAME,
            ...pickObj(appDefinition, 'ComponentClass', 'state', 'handlers', 'tmpl', 'onInit', 'onMount', 'onUnmount', 'onDestroy', 'onUpdate'),
        };
        super(app, parent, componentDefinition, {});
    }
    makeId() {
        return ROOT_COMPONENT_ID;
    }
}
