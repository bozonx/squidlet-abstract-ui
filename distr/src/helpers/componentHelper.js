import { omitObj } from 'squidlet-lib';
import { Component } from '../Component.js';
export function parseCmpInstanceDefinition(instanceDefinition) {
    const componentName = instanceDefinition.component;
    // values of child props which are set in this (parent) component
    const propsValues = omitObj(instanceDefinition, 'component', 'slot');
    let slotDefinition = {};
    if (Array.isArray(instanceDefinition.slot)) {
        slotDefinition = {
            default: instanceDefinition.slot
        };
    }
    else if (instanceDefinition.slot && typeof instanceDefinition.slot === 'object') {
        slotDefinition = instanceDefinition.slot;
    }
    return { componentName, propsValues, slotDefinition };
}
/**
 * Make instances of my direct children
 * @private
 */
export function instantiateChildComponent(childInstanceDefinition, app, parent, scopeComponent) {
    const { componentName, propsValues, slotDefinition, } = parseCmpInstanceDefinition(childInstanceDefinition);
    const componentDefinition = app.getComponentDefinition(componentName);
    // use class defined in component or simple component
    const ComponentClass = componentDefinition.ComponentClass || Component;
    return new ComponentClass(app, parent, componentDefinition, propsValues, slotDefinition, scopeComponent);
}
/**
 * Render base parameters of a component without params and children
 * @param cmp
 */
export function renderComponentBase(cmp) {
    const baseParams = {
        name: cmp.name,
        componentId: cmp.id,
    };
    if (cmp.isRoot) {
        return {
            ...baseParams,
            parentId: '',
            parentChildPosition: -1,
        };
    }
    else {
        // not root means it is Component. It has to have parent
        if (!cmp.parent) {
            throw new Error(`It "${cmp.id}" isn't root but doesn't have parent`);
        }
        const parentChildPosition = cmp.parent.getIndexOfChild(cmp.id);
        if (parentChildPosition === -1) {
            throw new Error(`Can't find my "${cmp.id}" position of parent ${cmp.parent.id}`);
        }
        return {
            ...baseParams,
            parentId: cmp.parent.id,
            parentChildPosition,
        };
    }
}
export function makeComponentUiParams(componentDefinition, props, state) {
    if (!componentDefinition.uiParams)
        return;
    const res = {};
    for (const item of componentDefinition.uiParams) {
        if (typeof item === 'string') {
            if (state.$super.hasKey(item)) {
                // deep param path is supported
                res[item] = state.$super.getValue(item);
            }
            else if (props.$super.hasKey(item)) {
                res[item] = props.$super.getValue(item);
            }
        }
        else {
            // TODO: а это зачем ???
            // means [string, () => any]
            res[item[0]] = item[1]();
        }
    }
    if (!Object.keys(res).length)
        return;
    return res;
}
export function validateComponentDefinition(cmp) {
    // TODO: validate component
}
