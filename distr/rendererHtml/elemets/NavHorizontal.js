import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderNavHorizontal(el, renderChild) {
    const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`;
    return `<ul ${id} class="s-nav-horizontal">${renderChild(el.children)}</ul>`;
}
