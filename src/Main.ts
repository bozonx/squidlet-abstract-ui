import {IndexedEventEmitter, ConsoleLogger, Logger} from 'squidlet-lib'
import {AppSingleton} from './AppSingleton.js';
import {AbstractUiPackage} from './types/types.js';
import {PackageManager} from './PackageManager.js';
import {ComponentsManager} from './ComponentsManager.js';
import {APP_CONFIG_DEFAULTS, AppConfig} from './types/AppConfig.js';


export enum SYSTEM_EVENTS {
  initStarted,
  initFinished,
  destroyStarted,
}


/**
 * Think of it as this is main process which is started on system.
 * And AppSingleton is a one of subprocess for each instance of each user and his
 * browser tab or application instance
 */
export class Main {
  readonly systemEvents = new IndexedEventEmitter()
  log: Logger
  readonly componentsManager = new ComponentsManager(this)
  readonly config: AppConfig
  readonly app = new AppSingleton(this)
  private readonly packageManager = new PackageManager(this)


  constructor(config: Partial<AppConfig>) {
    this.config = {
      ...APP_CONFIG_DEFAULTS,
      ...config,
    }
    this.log = new ConsoleLogger((this.config.debug) ? 'debug' : this.config.logLevel)
  }

  async init() {
    this.systemEvents.emit(SYSTEM_EVENTS.initStarted)

    await this.app.init()

    this.systemEvents.emit(SYSTEM_EVENTS.initFinished)
  }

  async destroy() {
    this.systemEvents.emit(SYSTEM_EVENTS.destroyStarted)

    this.systemEvents.destroy()
    await this.app.destroy()
  }


  setLogger(logger: Logger) {
    this.log = logger
  }

  use(pkg: AbstractUiPackage) {
    this.packageManager.use(pkg)
  }

}
