import {IncomeEvent} from '../types/IncomeEvent.js';
import {RenderedElement} from '../types/RenderedElement.js';
import {RenderEvents} from '../types/RenderEvents.js';


export class HtmlRenderer {
  readonly appSelector: string


  constructor(appSelector: string) {
    this.appSelector = appSelector;
  }

  init() {
    document.querySelector<HTMLDivElement>(this.appSelector)!.innerHTML = `
  <div>
    test
  </div>
`

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
    console.log(`mounting ${treeRoot}`)
  }

  private unmountTree(treeRoot: RenderedElement) {

  }

  private destroyTree(treeRoot: RenderedElement) {

  }

  private updateElement(treeRoot: RenderedElement) {

  }

}
