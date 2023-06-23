import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderNavItem(el, renderChild) {
    return `<li `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-nav-item"`
        + `>`
        + `<a href="${el.params?.to || ''}">${el.params?.value || ''}</a>`
        + renderChild(el.children)
        + `</li>`;
}
