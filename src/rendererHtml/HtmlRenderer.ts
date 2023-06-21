import {IncomeEvent} from '../types/IncomeEvent.js';
import {RenderedElement} from '../types/RenderedElement.js';
import {RenderEvents} from '../types/RenderEvents.js';
import {ROOT_COMPONENT_ID} from '../RootComponent.js';


export const COMPONENT_DATA_MARKER = 'data-c-id'


export class HtmlRenderer {
  readonly rootSelector: string


  constructor(appSelector: string) {
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


  render(event: RenderEvents, el: RenderedElement) {
    switch (event) {
      case RenderEvents.mount:
        this.mountTree(el)
        break
      case RenderEvents.unMount:
        this.unmountTree(el)
        break
      case RenderEvents.destroy:
        this.destroyTree(el)
        break
      case RenderEvents.update:
        this.updateElement(el)
        break
      default:
        console.error(`unknown event ${event}`)
        break
    }
  }


  private mountTree(treeRoot: RenderedElement) {
    console.log(`mounting`, treeRoot)

    const rootEl = this.getElementByComponentId(treeRoot.componentId)

    if (!rootEl) {
      console.error(`can't find root element for`, treeRoot.componentId)

      return
    }

    rootEl.innerHTML = this.renderElement(treeRoot)
  }

  private unmountTree(treeRoot: RenderedElement) {
    // TODO: add
  }

  private destroyTree(treeRoot: RenderedElement) {
    // TODO: add
  }

  private updateElement(treeRoot: RenderedElement) {
    // TODO: add
  }

  private getElementByComponentId(componentId: string): HTMLElement | null {
    if (componentId === ROOT_COMPONENT_ID) {
      return document.querySelector<HTMLDivElement>(this.rootSelector)
    }
    // else find component
    return document.querySelector<HTMLElement>(
      `[${COMPONENT_DATA_MARKER}="${componentId}"]`
    )
  }

  private renderElement(el: RenderedElement) {
    return `<div ${COMPONENT_DATA_MARKER}="${el.componentId}">${el.name}</div>`
  }

}
