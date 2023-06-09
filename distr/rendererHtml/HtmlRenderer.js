import { RenderEvents } from '../types/RenderEvents.js';
import { ROOT_COMPONENT_ID } from '../RootComponent.js';
import { RENDER_FUNCS } from './renderFuncs.js';
import { COMPONENT_DATA_MARKER } from './constants.js';
export class HtmlRenderer {
    rootSelector;
    constructor(appSelector) {
        this.rootSelector = appSelector;
    }
    init() {
        // element.addEventListener('click', () => setCounter(counter + 1))
    }
    render(event, el) {
        switch (event) {
            case RenderEvents.mount:
                this.mountTree(el);
                break;
            case RenderEvents.unMount:
                // the same as destroy
                this.destroyTree(el);
                break;
            case RenderEvents.destroy:
                this.destroyTree(el);
                break;
            case RenderEvents.update:
                this.updateElement(el);
                break;
            default:
                console.error(`unknown event ${event}`);
                break;
        }
    }
    mountTree(treeRoot) {
        //console.log(`mounting`, treeRoot)
        const rootEl = this.getElementByComponentId(treeRoot.componentId);
        if (!rootEl) {
            console.error(`can't find root element for`, treeRoot.componentId);
            return;
        }
        rootEl.innerHTML = this.renderElement(treeRoot);
    }
    destroyTree(treeRoot) {
        const rootEl = this.getElementByComponentId(treeRoot.componentId);
        // remove the element and its children
        rootEl?.remove();
    }
    updateElement(treeRoot) {
        // TODO: add
    }
    getElementByComponentId(componentId) {
        if (componentId === ROOT_COMPONENT_ID) {
            return document.querySelector(this.rootSelector);
        }
        // else find component
        return document.querySelector(`[${COMPONENT_DATA_MARKER}="${componentId}"]`);
    }
    renderElement(el) {
        // if it is custom component then just render its children
        if (!RENDER_FUNCS[el.name])
            return this.childrenRenderer(el.children);
        return RENDER_FUNCS[el.name](el, this.childrenRenderer);
    }
    childrenRenderer = (els) => {
        if (!els)
            return '';
        const resolvedEls = (Array.isArray(els)) ? els : [els];
        return resolvedEls.map((child) => this.renderElement(child))
            .join('\n');
    };
}
