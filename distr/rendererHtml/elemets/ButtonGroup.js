import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderButtonGroup(el, renderChild) {
    const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`;
    return `<span class="s-button-group" ${id}>${renderChild(el.children)}</span>`;
}
