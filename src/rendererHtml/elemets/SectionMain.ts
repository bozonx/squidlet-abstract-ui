import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderSectionMain(el: RenderedElement, renderChild: ChildrenRenderer): string {
  return `<main ${COMPONENT_DATA_MARKER}="${el.componentId}">${renderChild(el.children)}</main>`
}
