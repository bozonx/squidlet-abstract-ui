import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderNavHorizontal(el: RenderedElement, renderChild: ChildrenRenderer): string {
  const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`

  return `<ul ${id} class="s-nav-horizontal">${renderChild(el.children)}</ul>`
}
