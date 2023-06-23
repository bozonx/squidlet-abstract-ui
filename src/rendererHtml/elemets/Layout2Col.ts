import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderLayout2Col(el: RenderedElement, renderChild: ChildrenRenderer): string {

  console.log(222, el)

  return `<div `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-layout-2col"`
    + `>`
    + `<div class="s-layout-2col__left">${renderChild(el.children)}</div>`
    + `<div class="s-layout-2col__right"></div>`
    + `</div>`
}
