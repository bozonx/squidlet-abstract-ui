import BreadCrumbs, {BREADCRUMBS_DELIMITER} from './BreadCrumbs.js';
import {Route} from './Route.js';
import {Screen} from './Screen.js';
import {RouterDefinition} from './RouterDefinition.js';
import {AppSingleton} from '../AppSingleton.js';



export class AppRouter implements RouterDefinition {
  breadCrumbs = new BreadCrumbs()

  //private window: Window
  private routes: Route[] = []
  private currentScreenInstance!: Screen
  private currentRoute!: Route
  private app: AppSingleton


  get screen(): Screen {
    return this.currentScreenInstance
  }

  get route(): Route {
    return this.currentRoute
  }

  /**
   * Get cleared current path without params
   */
  get path(): string {
    return this.breadCrumbs.getCurrentPath()
  }

  getBaseName(): string {
    return this.breadCrumbs.getCurrentStep().name
  }

  getDirName(): string {
    return this.breadCrumbs.getDirName()
  }

  get routeParams(): Record<string, any> {
    return this.breadCrumbs.getCurrentStep().params
  }

  // get routeState(): UiState {
  //   return this.breadCrumbs.getCurrentStep().state
  // }


  constructor(app: AppSingleton) {
    // TODO: может всетаки сделать универсальным. без app
    this.app = app
    //this.window = window
    //
    //
  }

  init(routes?: Route[], initialPath: string = BREADCRUMBS_DELIMITER) {
    if (routes) this.routes = routes

    this.breadCrumbs.pathChangeEvent.addListener(this.onPathChanged)
    this.toPath(initialPath)
  }

  async destroy() {
    this.routes = []

    this.breadCrumbs.destroy()
  }


  toPath(pathTo: string) {
    const route = this.resolveRouteByPath(pathTo)

    if (!route) {
      // TODO: to screen 404

      return
    }

    this.currentRoute = route

    // TODO: при извлечении параметров очистить путь
    const clearPath = pathTo
    // TODO: можно извлечь параметры из пути и передать их в breadcrumbs
    const pathParams = {}

    this.breadCrumbs.toPath(clearPath, pathParams)
  }


  private onPathChanged = () => {
    (async () => {
      if (this.currentScreenInstance) {
        await this.currentScreenInstance.destroy()
      }

      // // TODO: нужно же брать уже готовый инстанс
      // // TODO: что ещё ему передать??
      // this.currentScreenInstance = new Screen(this.window)
      //
      // await this.currentScreenInstance.init()
    })()
      .catch((e) => {
        throw e

        // TODO: что делать с ошибкой??
      })
  }

  private resolveRouteByPath(pathTo: string): Route | undefined {
    return this.routes.find((el) => {

      // TODO: make smarter comparison

      if (el.path === pathTo) return true
    })
  }

}
