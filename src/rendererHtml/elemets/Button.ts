import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';


export function renderButton(el: RenderedElement): string {
  const id = `${COMPONENT_DATA_MARKER}="${el.componentId}"`
  const disabled: string = (el.params?.disabled) ? `disabled="disabled"` : ''

  // TODO: add leftIcon

  if (el.params?.to) {
    const href = `href=${el.params.to}`

    // TODO: add showExternalIcon

    return `<a class="s-button-link" ${id} ${href}>${el.params?.value || ''}</a>`
  }

  // TODO: add pending

  return `<button class="s-button" ${id} ${disabled}>${el.params?.value || ''}</button>`
}
