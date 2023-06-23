import { COMPONENT_DATA_MARKER } from '../constants.js';
export function renderLayout2Col(el, renderChild) {
    console.log(222, el);
    // TODO: проверять имя слота
    return `<div `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-layout-2col"`
        + `>`
        + `<div class="s-layout-2col__left">`
        + ((el.children?.[0]) ? renderChild(el.children[0]) : '')
        + `</div>`
        + `<div class="s-layout-2col__right">`
        + ((el.children?.[1]) ? renderChild(el.children[1]) : '')
        + `</div>`
        + `</div>`;
}
