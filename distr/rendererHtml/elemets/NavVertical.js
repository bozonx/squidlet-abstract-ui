import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderNavVertical(el, renderChild) {
    return `<ul `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-nav-vertical"`
        + `>${renderChild(el.children)}</ul>`;
}
