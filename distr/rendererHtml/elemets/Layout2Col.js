import { CHILDREN_MARKER_TMPL, COMPONENT_DATA_MARKER } from '../constants.js';
export function renderLayout2Col(el) {
    console.log(222, el);
    return `<div `
        + `${COMPONENT_DATA_MARKER}="${el.componentId}" `
        + `class="s-layout-2col"`
        + `>${CHILDREN_MARKER_TMPL}</div>`;
}
