import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderLayoutPage(el: RenderedElement, renderChild: ChildrenRenderer): string {
  const pageStyle = (el.params?.pageWidth)
    ? `style="width: ${el.params?.pageWidth}"`
    : ''

  return `<div `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-layout-page"`
    + `>`
    +   `<div class="s-layout-page__page" ${pageStyle}>${renderChild(el.children)}</div>`
    + `</div>`
}
