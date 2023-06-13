import {IndexedEventEmitter, Logger} from 'squidlet-lib'
import {Main} from './Main.js';
import {RootComponent} from './RootComponent.js';
import {IncomeEvents, OutcomeEvents} from './types/DomEvents.js';
import {RenderedElement} from './types/RenderedElement.js';
import {ComponentDefinition} from './Component.js';
import {AppRouter} from './routerBase/AppRouter.js';


export const COMPONENT_EVENT_PREFIX = 'C|'

export enum APP_EVENTS {
  initStarted,
  initFinished,
  // destroy started
  destroy,
  // outcome event which has to be handled by external renderer
  render,
}


/**
 * It is a context for components and whole app structure.
 * Think of this as one of instances for the same app and one of users.
 * This is the main and the only singleton for whole browser tab or application instance
 * or server side renderer.
 */
export class AppSingleton {
  // TODO: переместить в events
  readonly incomeEvents = new IndexedEventEmitter()
  readonly events = new IndexedEventEmitter()
  readonly root: RootComponent
  readonly router = new AppRouter()
  private readonly main: Main


  get log(): Logger {
    return this.main.log
  }


  constructor(main: Main) {
    this.main = main
    this.root = new RootComponent(
      this,
      this.main.componentsManager.appDefinition.tmpl,
      this.main.componentsManager.appDefinition.state,
    )
  }


  async init() {
    this.events.emit(APP_EVENTS.initStarted)

    this.router.init(this.main.componentsManager.appDefinition.routes)
    await this.root.init()
    // render root component
    await this.root.mount()

    this.events.emit(APP_EVENTS.initFinished)
  }

  async destroy() {
    this.events.emit(APP_EVENTS.destroy)

    this.events.destroy()
    this.incomeEvents.destroy()
    // tell the ui to unmount root
    // TODO: а нужно ли это? может destroy автоматом значит и unmount?
    //await this.root.unmount()
    await this.root.destroy()
    this.router.destroy()
  }

  /**
   * It is called from component to render an element
   * @param event
   * @param el
   */
  $$render(event: OutcomeEvents, el: RenderedElement) {
    this.events.emit(APP_EVENTS.render, event, el)
  }


  /**
   * Call it from outside code
   */
  emitIncomeEvent(event: IncomeEvents, componentId: string, ...data: any[]) {
    // emit ordinary event
    this.incomeEvents.emit(event, componentId, ...data)
    // emit component specific event
    this.incomeEvents.emit(COMPONENT_EVENT_PREFIX + componentId, event, ...data)
  }

  getComponentDefinition = (componentName: string): ComponentDefinition => {
    return this.main.componentsManager.getComponentDefinition(componentName)
  }

}
