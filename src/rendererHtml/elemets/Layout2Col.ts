import {RenderedElement} from '../../types/RenderedElement.js';
import {CHILDREN_MARKER_TMPL, COMPONENT_DATA_MARKER} from '../constants.js';


export function renderLayout2Col(el: RenderedElement): string {

  console.log(222, el)

  return `<div `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-layout-2col"`
    + `>`
    + `<div class="s-layout-2col__left">${CHILDREN_MARKER_TMPL}</div>`
    + `<div class="s-layout-2col__right"></div>`
    + `</div>`
}
