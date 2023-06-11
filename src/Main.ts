import {IndexedEventEmitter, ConsoleLogger, Logger} from 'squidlet-lib'
import {AppSingleton} from './AppSingleton.js';
import {AbstractUiPackage} from './types/types.js';
import {PackageManager} from './PackageManager.js';
import {ComponentsManager} from './ComponentsManager.js';
import {APP_CONFIG_DEFAULTS, AppConfig} from './types/AppConfig.js';
import {ComponentDefinition} from './Component.js';
import {ROOT_COMPONENT_ID, RootComponentDefinition} from './RootComponent.js';


export enum SYSTEM_EVENTS {
  initStarted,
  initFinished,
  destroyStarted,
  newApp,
  appStarted,
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
  // TODO: а вообще имеет смысл делать несколько apps ???
  app!: AppSingleton
  private readonly packageManager = new PackageManager(this)


  constructor(config: Partial<AppConfig>) {
    this.config = {
      ...APP_CONFIG_DEFAULTS,
      ...config,
    }
    // TODO: а оно надо? можно же слушать события логера
    this.log = new ConsoleLogger((this.config.debug) ? 'debug' : this.config.logLevel)
  }

  async init() {
    this.systemEvents.emit(SYSTEM_EVENTS.initStarted)

    this.app = new AppSingleton(this)

    this.systemEvents.emit(SYSTEM_EVENTS.newApp, this.app)

    await this.app.init()

    this.systemEvents.emit(SYSTEM_EVENTS.appStarted, this.app)

    this.systemEvents.emit(SYSTEM_EVENTS.initFinished)
  }

  async destroy() {
    this.systemEvents.emit(SYSTEM_EVENTS.destroyStarted)

    this.systemEvents.destroy()
    await this.app.destroy()
  }


  // TODO: впринципе не нужно, логгер можно просто слушать события логера
  setLogger(logger: Logger) {
    this.log = logger
  }

  registerRouter() {
    // TODO: может тоже внешне подключать - слушать события роутера - push, replace
    // TODO: хотя роутер то должен быть один всего
    // TODO: add - регистрировать базу на систему
    // TODO: но его инстанс должен создаваться в AppSingleton
  }

  use(pkg: AbstractUiPackage) {
    this.packageManager.use(pkg)
  }

  setRoot(rootComponent: string | RootComponentDefinition) {
    this.componentsManager.registerComponents({
      [ROOT_COMPONENT_ID]: rootComponent as any
    })
  }

}
