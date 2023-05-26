import {IndexedEventEmitter, ConsoleLogger, Logger} from 'squidlet-lib'
import {AppSingleton} from './AppSingleton';
import {AbstractUiPackage} from './types/types';
import {PackageManager} from './PackageManager';
import {ComponentsManager} from './ComponentsManager';
import {APP_CONFIG_DEFAULTS, AppConfig} from './types/AppConfig';


export enum APP_EVENTS {
  initStarted,
  initFinished,
  destroyStarted,
}


export class Main {
  readonly appEvents = new IndexedEventEmitter()
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
    this.appEvents.emit(APP_EVENTS.initStarted)

    await this.app.init()

    this.appEvents.emit(APP_EVENTS.initFinished)
  }

  async destroy() {
    this.appEvents.emit(APP_EVENTS.destroyStarted)

    this.appEvents.destroy()
    await this.app.destroy()
  }


  setLogger(logger: Logger) {
    this.log = logger
  }

  use(pkg: AbstractUiPackage) {
    this.packageManager.use(pkg)
  }

}
