import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../HtmlRenderer.js';


export function renderText(el: RenderedElement) {
  return `<span ${COMPONENT_DATA_MARKER}="${el.componentId}">${el.name}</span>`
}
