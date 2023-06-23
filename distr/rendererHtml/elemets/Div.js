import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderDiv(el, renderChild) {
    return `<div ${COMPONENT_DATA_MARKER}="${el.componentId}">${renderChild(el.children)}</d>`;
}
