import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderNavItem(el: RenderedElement, renderChild: ChildrenRenderer): string {
  return `<li `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-nav-item"`
    + `>`
    + `<a href="${el.params?.to || ''}">${el.params?.value || ''}</a>`
    + renderChild(el.children)
    + `</li>`
}
