import {RenderedElement} from '../../types/RenderedElement.js';
import {COMPONENT_DATA_MARKER} from '../constants.js';
import {ChildrenRenderer} from '../types.js';


export function renderLayout3Col(el: RenderedElement, renderChild: ChildrenRenderer): string {
  const leftSlot = el.children?.find((child) => {
    return child.name === 'Slot' && child.params?.slotName === 'left'
  })
  const centerSlot = el.children?.find((child) => {
    return child.name === 'Slot' && child.params?.slotName === 'center'
  })
  const rightSlot = el.children?.find((child) => {
    return child.name === 'Slot' && child.params?.slotName === 'right'
  })
  const leftColStyle = (el.params?.leftColWidth)
    ? `style="width: ${el.params?.leftColWidth}"`
    : ''
  const centerColStyle = (el.params?.centerColWidth)
    ? `style="width: ${el.params?.centerColWidth}"`
    : ''
  const rightColStyle = (el.params?.rightColWidth)
    ? `style="width: ${el.params?.rightColWidth}"`
    : ''

  return `<div `
    + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
    + `class="s-layout-3col"`
    + `>`
    +   `<div class="s-layout-3col__left" ${leftColStyle}>${renderChild(leftSlot)}</div>`
    +   `<div class="s-layout-3col__center" ${centerColStyle}>${renderChild(centerSlot)}</div>`
    +   `<div class="s-layout-3col__right" ${rightColStyle}>${renderChild(rightSlot)}</div>`
    + `</div>`
}
