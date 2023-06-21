import { CHILDREN_MARKER_TMPL, COMPONENT_DATA_MARKER } from '../constants.js';
export function renderDiv(el) {
    return `<div ${COMPONENT_DATA_MARKER}="${el.componentId}">${CHILDREN_MARKER_TMPL}</d>`;
}
