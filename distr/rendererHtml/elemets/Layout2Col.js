import { COMPONENT_DATA_MARKER } from '../constants.js';
import { makeStyleTag } from '../helpers.js';
export function renderLayout2Col(el, renderChild) {
    const leftSlot = el.children?.find((child) => {
        return child.name === 'Slot' && child.params?.slotName === 'left';
    });
    const rightSlot = el.children?.find((child) => {
        return child.name === 'Slot' && child.params?.slotName === 'right';
    });
    const leftColStyle = makeStyleTag({ width: el.params?.leftColWidth });
    const rightColStyle = makeStyleTag({ width: el.params?.rightColWidth });
    return `<div `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-layout-2col"`
        + `>`
        + `<div class="s-layout-2col__left" ${leftColStyle}>${renderChild(leftSlot)}</div>`
        + `<div class="s-layout-2col__right" ${rightColStyle}>${renderChild(rightSlot)}</div>`
        + `</div>`;
}
