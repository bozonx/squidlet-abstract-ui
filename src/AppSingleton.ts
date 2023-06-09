import {IndexedEventEmitter, Logger} from 'squidlet-lib'
import {ProxyfiedData, SuperData} from 'squidlet-sprog'
import {Main} from './Main.js';
import {RootComponent} from './RootComponent.js';
import {IncomeEvent} from './types/IncomeEvent.js';
import {RenderedElement} from './types/RenderedElement.js';
import {AppRouter} from './routerBase/AppRouter.js';
import {ComponentDefinition} from './types/ComponentDefinition.js';
import {AppContext} from './AppContext.js';
import {RenderEvents} from './types/RenderEvents.js';
import {APP_EVENTS} from './types/AppEvents.js';


const COMPONENT_EVENT_PREFIX = '|C|'


/**
 * It is a context for components and whole app structure.
 * Think of this as one of instances for the same app and one of users.
 * This is the main and the only singleton for whole browser tab or application instance
 * or server side renderer.
 */
export class AppSingleton {
  readonly events = new IndexedEventEmitter()
  readonly root: RootComponent
  readonly router = new AppRouter(this)
  readonly context = new AppContext(this)
  // global storage of application
  storage!: ProxyfiedData
  private readonly main: Main


  get log(): Logger {
    return this.main.log
  }


  constructor(main: Main) {
    this.main = main
    this.root = new RootComponent(this, this.main.componentsManager.appDefinition)
  }


  async init(initialPath?: string) {
    this.events.emit(APP_EVENTS.initStarted)

    this.storage = (new SuperData(
      this.main.componentsManager.appDefinition.storage
    )).getProxy()

    this.storage.$super.init()
    this.router.init(
      this.main.componentsManager.appDefinition.routes,
      this.main.componentsManager.appDefinition.screens,
      initialPath
    )
    await this.root.init()
    // render root component
    await this.root.mount()

    this.events.emit(APP_EVENTS.initFinished)
  }

  async destroy() {
    this.events.emit(APP_EVENTS.destroy)
    await this.root.destroy()
    this.router.destroy()
    this.events.destroy()
  }

  /**
   * It is called from component to render an element
   * @param event
   * @param el
   */
  $$render(event: RenderEvents, el: RenderedElement) {
    this.events.emit(APP_EVENTS.render, event, el)
  }


  /**
   * Call it from outside code
   */
  emitIncomeEvent(event: IncomeEvent['name'], componentId: string, params?: Record<string, any>) {
    const incomeEvent: IncomeEvent = {
      name: event,
      params: params || {},
    }
    // emit ordinary event
    this.events.emit(APP_EVENTS.income, componentId, incomeEvent)
    // emit component specific event
    this.events.emit(this.makeIncomeEventName(componentId), incomeEvent)
  }

  getComponentDefinition = (componentName: string): ComponentDefinition => {
    return this.main.componentsManager.getComponentDefinition(componentName)
  }

  makeIncomeEventName(componentId: string): string {
    return APP_EVENTS.income + COMPONENT_EVENT_PREFIX + componentId
  }

}
