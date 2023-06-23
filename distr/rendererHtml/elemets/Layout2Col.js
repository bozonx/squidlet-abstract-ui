import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderLayout2Col(el, renderChild) {
    console.log(222, el);
    // TODO: проверять имя слота
    const leftSlot = el.children?.find((child) => {
        return child.name === 'Slot' && child.params?.slotName === 'left';
    });
    const rightSlot = el.children?.find((child) => {
        return child.name === 'Slot' && child.params?.slotName === 'right';
    });
    return `<div `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-layout-2col"`
        + `>`
        + `<div class="s-layout-2col__left">`
        + renderChild(leftSlot)
        + `</div>`
        + `<div class="s-layout-2col__right">`
        + renderChild(rightSlot)
        + `</div>`
        + `</div>`;
}
