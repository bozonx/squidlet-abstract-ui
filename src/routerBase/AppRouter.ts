import {IndexedEventEmitter} from 'squidlet-lib';
import BreadCrumbs, {BREADCRUMBS_DELIMITER} from './BreadCrumbs.js';
import {Route, RouteBase, RouteDefinition} from '../types/Route.js';
import {ScreenComponent, ScreenDefinition} from '../ScreenComponent.js';
import {AppSingleton} from '../AppSingleton.js';


export enum APP_ROUTER_EVENTS {
  // current route changed
  change,
  // added some new routes
  routesAdded,
}

interface StoredRoute extends RouteBase {
  screen: string
}


export class AppRouter {
  readonly breadCrumbs = new BreadCrumbs()
  readonly events = new IndexedEventEmitter()
  private routes: StoredRoute[] = []
  private currentRoute!: Route
  private screensDefinitions: ScreenDefinition[] = []
  private readonly app: AppSingleton


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


  constructor(app: AppSingleton) {
    this.app = app
  }

  init(
    routes?: RouteDefinition[],
    screensDefinitions?: ScreenDefinition[],
    initialPath: string = BREADCRUMBS_DELIMITER
  ) {

    // TODO: запретить инициализировать повторно

    if (!routes || !routes.length) return

    this.screensDefinitions = [ ...screensDefinitions || [] ]

    for (const routeDef of routes) {
      let screenName: string | undefined

      if (typeof routeDef.screen === 'object') {
        // found definition. Save it to collection
        this.screensDefinitions.push(routeDef.screen)

        screenName = routeDef.screen.name
      }
      else {
        screenName = routeDef.screen
      }

      if (typeof screenName !== 'string') {
        throw new Error(`Can't resolve screen name`)
      }

      this.routes.push({
        path: routeDef.path,
        screen: screenName,
        params: routeDef.params,
      })
    }

    this.breadCrumbs.pathChangeEvent.addListener(this.onPathChanged)
    this.push(initialPath)
  }

  destroy() {
    // TODO: задестроить current screen
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

  // private resolveScreen(
  //   defScreen: string | ScreenDefinition,
  //   screens: ScreenComponent[]
  // ): ScreenDefinition {
  //   if (typeof defScreen === 'string') {
  //     const foundScreen = screens.find((scr) => {
  //       return scr.name === defScreen
  //     })
  //
  //     if (!foundScreen) throw new Error(`Can't find screen "${defScreen}"`)
  //     // return screen which was found
  //     return foundScreen
  //   }
  //
  //   return this.instantiateScreen(defScreen)
  // }

  private instantiateScreen(scrDef: ScreenDefinition): ScreenComponent {
    return new ScreenComponent(
      this.app,
      // TODO: на самом деле взять Route компонент, но как ???
      this.app.root,
      defScreen,
      // TODO: слота не должно быть
      {}
    )
  }

}
