import {IndexedEventEmitter} from 'squidlet-lib';
import BreadCrumbs, {BREADCRUMBS_DELIMITER} from './BreadCrumbs.js';
import {Route, RouteDefinition} from '../types/Route.js';
import {ScreenComponent, ScreenDefinition} from '../ScreenComponent.js';


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
  private currentRoute!: Route
  private screensDefinition: ScreenDefinition[] = []


  get isDestroyed(): boolean {
    return this.events.isDestroyed
  }

  get screen(): ScreenComponent {
    return this.currentRoute.screen
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
    // TODO: зачем это??? есть же параметры route
    return this.breadCrumbs.getCurrentStep().params
  }


  constructor() {
  }

  init(
    routes?: RouteDefinition[],
    screensDefinitions?: ScreenDefinition[],
    initialPath: string = BREADCRUMBS_DELIMITER
  ) {

    // TODO: запретить инициализировать повторно
    // TODO: scrrens надо хранить так как если потом добавляешь роуты то можно их использовать
    // TODO: надо хрнить definiton скринов так как они будут создаваться при переходах

    this.screensDefinition = [ ...screensDefinitions || [] ]

    if (routes) {
      for (const routeDef of routes) {
        const route: Route = {
          path: routeDef.path,
          screen: this.resolveScreen(routeDef.screen, screens),
          params: routeDef.params,
        }

        this.routes.push(route)
      }
    }

    this.breadCrumbs.pathChangeEvent.addListener(this.onPathChanged)
    this.push(initialPath)
  }

  destroy() {
    // TODO: задестроить все Screen
    this.routes = []

    this.breadCrumbs.destroy()
    this.events.destroy()
  }


  /**
   * Add some new routes to the top of routes array
   * @param routes
   */
  addRoutes(routes: Route[]) {

    // TODO: нормально зарезовлить как в init

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
      if (this.currentRoute?.screen) {
        await this.currentRoute?.screen.destroy()
      }

      // // TODO: нужно же брать уже готовый инстанс
      // // TODO: что ещё ему передать??
      // this.currentScreenInstance = new ScreenComponent(this.window)
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

  private resolveScreen(
    defScreen: string | ScreenDefinition,
    screens: ScreenComponent[]
  ): ScreenComponent {
    if (typeof defScreen === 'string') {
      const foundScreen = screens.find((scr) => {
        return scr.name === defScreen
      })

      if (!foundScreen) throw new Error(`Can't find screen "${defScreen}"`)
      // return screen which was found
      return foundScreen
    }

    return this.instantiateScreen(defScreen)
  }

  private instantiateScreen(scrDef: ScreenDefinition): ScreenComponent {
    return new Screen(defScreen)
  }

}
