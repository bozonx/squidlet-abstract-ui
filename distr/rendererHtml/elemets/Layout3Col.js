import { COMPONENT_DATA_MARKER } from '../constants.js';
import { makeStyleTag } from '../helpers.js';
export function renderLayout3Col(el, renderChild) {
    const leftSlot = el.children?.find((child) => {
        return child.name === 'Slot' && child.params?.slotName === 'left';
    });
    const centerSlot = el.children?.find((child) => {
        return child.name === 'Slot' && child.params?.slotName === 'center';
    });
    const rightSlot = el.children?.find((child) => {
        return child.name === 'Slot' && child.params?.slotName === 'right';
    });
    const leftColStyle = makeStyleTag({ width: el.params?.leftColWidth });
    const centerColStyle = makeStyleTag({ width: el.params?.centerColWidth });
    const rightColStyle = makeStyleTag({ width: el.params?.rightColWidth });
    return `<div `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-layout-3col"`
        + `>`
        + `<div class="s-layout-3col__left" ${leftColStyle}>${renderChild(leftSlot)}</div>`
        + `<div class="s-layout-3col__center" ${centerColStyle}>${renderChild(centerSlot)}</div>`
        + `<div class="s-layout-3col__right" ${rightColStyle}>${renderChild(rightSlot)}</div>`
        + `</div>`;
}
