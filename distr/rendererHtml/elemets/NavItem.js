import { CHILDREN_MARKER_TMPL, COMPONENT_DATA_MARKER } from '../constants.js';
export function renderNavItem(el) {
    console.log(111, el);
    return `<li `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-nav-item"`
        + `>`
        + `<a href="${el.params?.to || ''}">${el.params?.value || ''}</a>`
        + `${CHILDREN_MARKER_TMPL}`
        + `</li>`;
}
