import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderSectionMain(el, renderChild) {
    return `<main ${COMPONENT_DATA_MARKER}="${el.componentId}">${renderChild(el.children)}</main>`;
}
