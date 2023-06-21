import { RenderEvents } from '../types/RenderEvents.js';
export class HtmlRenderer {
    appSelector;
    constructor(appSelector) {
        this.appSelector = appSelector;
    }
    init() {
        document.querySelector(this.appSelector).innerHTML = `
  <div>
    test
  </div>
`;
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
        console.log(`mounting ${treeRoot}`);
    }
    unmountTree(treeRoot) {
    }
    destroyTree(treeRoot) {
    }
    updateElement(treeRoot) {
    }
}
