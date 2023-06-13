import {Logger, IndexedEventEmitter} from 'squidlet-lib'
import {Main, SYSTEM_EVENTS} from './Main.js';
import {AppSingleton} from './AppSingleton.js';
import {ComponentDefinition} from './Component.js';


export class PackageContext {
  private readonly main: Main


  get systemEvents(): IndexedEventEmitter {
    return this.main.systemEvents
  }


  constructor(main: Main) {
    this.main = main
  }


  setRouter() {
    this.main.registerRouter()
  }

  setLogger(logger: Logger) {
    this.main.setLogger(logger)
  }

  registerComponents(components: (string | ComponentDefinition)[]) {
    this.main.componentsManager.registerComponents(components)
  }

  // /**
  //  * Listen each app started and manipulate it - listen its events
  //  * and call emitIncomeEvent
  //  */
  // onAppStarted(handler: (app: AppSingleton) => void): number {
  //   return this.main.systemEvents.addListener(SYSTEM_EVENTS.appStarted, handler)
  // }

}
