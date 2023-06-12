import {IndexedEventEmitter, IndexedEvents, Logger} from 'squidlet-lib'
import {Main} from './Main.js';
import {RootComponent} from './RootComponent.js';
import {IncomeEvents, OutcomeEvents} from './types/DomEvents.js';
import {RenderedElement} from './types/RenderedElement.js';
import {ComponentDefinition} from './Component.js';
import {AppRouter} from './routerBase/AppRouter.js';


type OutcomeEventHandler = (event: OutcomeEvents, el: RenderedElement) => void


export const COMPONENT_EVENT_PREFIX = 'C|'


/**
 * It is a context for components and whole app structure.
 * Think of this as one of instances for the same app and one of users.
 * This is the main and the only singleton for whole browser tab or application instance
 * or server side renderer.
 */
export class AppSingleton {
  readonly outcomeEvents = new IndexedEvents<OutcomeEventHandler>()
  readonly incomeEvents = new IndexedEventEmitter()
  readonly root: RootComponent
  readonly router = new AppRouter(this)
  private readonly main: Main
  // TODO: add router


  get log(): Logger {
    return this.main.log
  }


  // router = {
  //   toPath: (p: Record<any, any>) => {
  //     console.log(777, p)
  //   }
  // }


  constructor(main: Main) {
    this.main = main
    this.root = new RootComponent(
      this,
      this.main.componentsManager.appDefinition.tmpl,
      this.main.componentsManager.appDefinition.state,
    )

    // TODO: создать свой инстанс роутера

  }


  async init() {
    this.router.init(this.main.componentsManager.appDefinition.routes)
    await this.root.init()
    // render root component
    await this.root.mount()
  }

  async destroy() {
    this.outcomeEvents.destroy()
    this.incomeEvents.destroy()
    // tell the ui to unmount root
    // TODO: а нужно ли это? может destroy автоматом значит и unmount?
    //await this.root.unmount()
    await this.root.destroy()
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
