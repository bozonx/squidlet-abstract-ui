import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderText(el) {
    return `<span ${COMPONENT_DATA_MARKER}="${el.componentId}">${el.params?.value || ''}</span>`;
}
