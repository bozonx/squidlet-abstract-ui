import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';


export function renderNavDelimiter(el: RenderedElement): string {
  const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`

  return `<li ${id} class="s-nav-header">`
    +   `<h4>${el.params?.value || ''}</h4>`
    + `</li>`
}
