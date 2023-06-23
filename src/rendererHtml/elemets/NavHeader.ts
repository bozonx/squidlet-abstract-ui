import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';


export function renderNavHeader(el: RenderedElement): string {
  const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`

  return `<li ${id} class="s-nav-delimiter"></li>`
}
