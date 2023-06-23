import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderLayout2Col(el: RenderedElement, renderChild: ChildrenRenderer): string {
  const leftSlot = el.children?.find((child) => {
    return child.name === 'Slot' && child.params?.slotName === 'left'
  })
  const rightSlot = el.children?.find((child) => {
    return child.name === 'Slot' && child.params?.slotName === 'right'
  })

  return `<div `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-layout-2col"`
    + `>`
    +   `<div class="s-layout-2col__left">`
    +     renderChild(leftSlot)
    +   `</div>`
    +   `<div class="s-layout-2col__right">`
    +     renderChild(rightSlot)
    +   `</div>`
    + `</div>`
}
