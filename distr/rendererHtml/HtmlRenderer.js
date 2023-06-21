import { RenderEvents } from '../types/RenderEvents.js';
import { ROOT_COMPONENT_ID } from '../RootComponent.js';
export const COMPONENT_DATA_MARKER = 'data-c-id';
export class HtmlRenderer {
    rootSelector;
    constructor(appSelector) {
        this.rootSelector = appSelector;
    }
    init() {
        //     document.querySelector<HTMLDivElement>(this.rootSelector)!.innerHTML = `
        //   <div>
        //     test
        //   </div>
        // `
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
        console.log(`mounting`, treeRoot);
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
        // TODO: проверить
        // else find component
        return document.querySelector(`[${COMPONENT_DATA_MARKER}=${componentId}]`);
    }
    renderElement(el) {
        return `<div ${COMPONENT_DATA_MARKER}="${el.componentId}">${el.name}</div>`;
    }
}
