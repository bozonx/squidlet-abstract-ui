import {RenderedElement} from '../../types/RenderedElement.js';
import {CHILDREN_MARKER_TMPL, COMPONENT_DATA_MARKER} from '../constants.js';


export function renderDiv(el: RenderedElement): string {
  return `<div ${COMPONENT_DATA_MARKER}="${el.componentId}">${CHILDREN_MARKER_TMPL}</d>`
}