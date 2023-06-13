import {ScreenDefinition} from '../Screen.js';


// this is definition of route in App config
export interface RouteDefinition {
  path: string
  // it is screen name which will be get from AppDefinition.screens
  // of complete screen definition
  screen: string | ScreenDefinition
  params?: Record<string, any>
}

// this is runtime route
export interface Route {
  path: string
  screen: Screen
  params?: Record<string, any>
}
