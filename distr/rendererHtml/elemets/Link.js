import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderLink(el) {
    const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`;
    const href = `href=${el.params?.to || ''}`;
    // TODO: add showExternalIcon
    return `<a ${id} ${href}>${el.params?.value || ''}</a>`;
}
