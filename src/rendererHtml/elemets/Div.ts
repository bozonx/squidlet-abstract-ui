import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../HtmlRenderer.js';


export function renderDiv(el: RenderedElement) {
  return `<div ${COMPONENT_DATA_MARKER}="${el.componentId}">${el.name}</d>`
}
