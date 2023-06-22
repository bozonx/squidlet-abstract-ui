import {RenderedElement} from '../../types/RenderedElement.js';
import {CHILDREN_MARKER_TMPL, COMPONENT_DATA_MARKER} from '../constants.js';


export function renderNavVertical(el: RenderedElement): string {
  return `<ul `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-nav-vertical"`
    + `>${CHILDREN_MARKER_TMPL}</ul>`
}
