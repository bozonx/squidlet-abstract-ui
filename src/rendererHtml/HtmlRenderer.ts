import _ from 'lodash';
import {RenderedElement} from '../types/RenderedElement.js';
import {RenderEvents} from '../types/RenderEvents.js';
import {ROOT_COMPONENT_ID} from '../RootComponent.js';
import {RENDER_FUNCS} from './renderFuncs.js';
import {COMPONENT_DATA_MARKER} from './constants.js';
import {ChildrenRenderer} from './types.js';


export class HtmlRenderer {
  readonly rootSelector: string


  constructor(appSelector: string) {
    this.rootSelector = appSelector
  }

  init() {

// element.addEventListener('click', () => setCounter(counter + 1))

  }


  render(event: RenderEvents, el: RenderedElement) {
    switch (event) {
      case RenderEvents.mount:
        this.mountTree(el)
        break
      case RenderEvents.unMount:
        // the same as destroy
        this.destroyTree(el)
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
    //console.log(`mounting`, treeRoot)

    const rootEl = this.getElementByComponentId(treeRoot.componentId)

    if (!rootEl) {
      console.error(`can't find root element for`, treeRoot.componentId)

      return
    }

    rootEl.innerHTML = this.renderElement(treeRoot)
  }

  private destroyTree(treeRoot: RenderedElement) {
    const rootEl = this.getElementByComponentId(treeRoot.componentId)
    // remove the element and its children
    rootEl?.remove()
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

  private renderElement(el: RenderedElement): string {
    // if it is custom component then just render its children
    if (!RENDER_FUNCS[el.name]) return this.childrenRenderer(el.children)

    return RENDER_FUNCS[el.name](el, this.childrenRenderer)
  }

  private childrenRenderer: ChildrenRenderer = (els?: RenderedElement | RenderedElement[]): string => {
    if (!els) return ''

    const resolvedEls = (Array.isArray(els)) ? els : [els]

    return resolvedEls.map((child) => this.renderElement(child))
      .join('\n')
  }

}
