import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderHeader(el) {
    const tag = 'h' + el.params.level;
    return `<${tag} ${COMPONENT_DATA_MARKER}="${el.componentId}">${el.params?.value || ''}</${tag}>`;
}
