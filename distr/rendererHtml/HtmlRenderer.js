import _ from 'lodash';
import { RenderEvents } from '../types/RenderEvents.js';
import { ROOT_COMPONENT_ID } from '../RootComponent.js';
import { RENDER_FUNCS } from './renderFuncs.js';
import { CHILDREN_MARKER, COMPONENT_DATA_MARKER } from './constants.js';
export class HtmlRenderer {
    rootSelector;
    constructor(appSelector) {
        this.rootSelector = appSelector;
    }
    init() {
        // element.addEventListener('click', () => setCounter(counter + 1))
        //setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
    }
    render(event, el) {
        switch (event) {
            case RenderEvents.mount:
                this.mountTree(el);
                break;
            case RenderEvents.unMount:
                this.unmountTree(el);
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
    unmountTree(treeRoot) {
        // TODO: add
    }
    destroyTree(treeRoot) {
        // TODO: add
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
        console.log(1111, el);
        // recursively render children
        const children = (el.children || [])
            .map((child) => this.renderElement(child));
        const childrenStr = children.join('\n');
        // if it is custom component then just render its children
        if (!RENDER_FUNCS[el.name])
            return childrenStr;
        const renderedEl = RENDER_FUNCS[el.name](el);
        return _.template(renderedEl)({
            [CHILDREN_MARKER]: childrenStr
        });
    }
}
