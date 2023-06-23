import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderNavSub(el, renderChild) {
    const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`;
    return `<ul ${id} class="s-nav-sub">${renderChild(el.children)}</ul>`;
}
