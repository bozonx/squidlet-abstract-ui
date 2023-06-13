import {IndexedEventEmitter} from 'squidlet-lib';
import BreadCrumbs, {BREADCRUMBS_DELIMITER} from './BreadCrumbs.js';
import {Route} from '../types/Route.js';
import {Screen} from '../Screen.js';


export enum APP_ROUTER_EVENTS {
  // current route changed
  change,
  // added some new routes
  routesAdded,
}


export class AppRouter {
  readonly breadCrumbs = new BreadCrumbs()
  readonly events = new IndexedEventEmitter()
  private routes: Route[] = []
  private currentScreenInstance!: Screen
  private currentRoute!: Route
  private currentPath?: string


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


  constructor() {
  }

  init(routes?: Route[], initialPath: string = BREADCRUMBS_DELIMITER) {
    if (routes) this.routes = routes

    this.breadCrumbs.pathChangeEvent.addListener(this.onPathChanged)
    this.push(initialPath)
  }

  destroy() {
    this.routes = []

    this.breadCrumbs.destroy()
    this.events.destroy()
  }


  /**
   * Add some new routes to the top of routes array
   * @param routes
   */
  addRoutes(routes: Route[]) {
    this.routes = [
      ...this.routes,
      ...routes,
    ]

    this.events.emit(APP_ROUTER_EVENTS.routesAdded)
  }

  push(pathTo: string) {
    const route = this.resolveRouteByPath(pathTo)

    if (!route) {
      // TODO: to screen 404

      return
    }

    this.currentRoute = route
    this.currentPath = pathTo

    // TODO: при извлечении параметров очистить путь
    const clearPath = pathTo
    // TODO: можно извлечь параметры из пути и передать их в breadcrumbs
    const pathParams = {}

    this.breadCrumbs.toPath(clearPath, pathParams)

    // TODO: поднять событие смены роута - событие есть и в breadcrumbs
  }

  replace(route: Route) {
    // TODO: replace current route but don't change current path
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
