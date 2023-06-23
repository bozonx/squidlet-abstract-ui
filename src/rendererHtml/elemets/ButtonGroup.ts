import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderButtonGroup(el: RenderedElement, renderChild: ChildrenRenderer): string {
  const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`

  return `<span class="s-button-group" ${id}>${renderChild(el.children)}</span>`
}
