import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderNavVertical(el: RenderedElement, renderChild: ChildrenRenderer): string {
  return `<ul `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-nav-vertical"`
    + `>${renderChild(el.children)}</ul>`
}
