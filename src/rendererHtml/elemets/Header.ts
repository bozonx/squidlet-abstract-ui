import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';


export function renderHeader(el: RenderedElement): string {
  return `<span ${COMPONENT_DATA_MARKER}="${el.componentId}">${el.params?.value || ''}</span>`
}
