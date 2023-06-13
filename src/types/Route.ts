import {ScreenComponent, ScreenDefinition} from '../ScreenComponent.js';


export interface RouteBase {
  path: string
  params?: Record<string, any>
}

// this is definition of route in App config
export interface RouteDefinition extends RouteBase {
  // it is screen name which will be get from AppDefinition.screens
  // of complete screen definition
  screen: string | ScreenDefinition
}

// this is runtime route
export interface Route extends RouteBase {
  screen: ScreenComponent
}
