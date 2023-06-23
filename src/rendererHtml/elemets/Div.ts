import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderDiv(el: RenderedElement, renderChild: ChildrenRenderer): string {
  return `<div ${COMPONENT_DATA_MARKER}="${el.componentId}">${renderChild(el.children)}</d>`
}
