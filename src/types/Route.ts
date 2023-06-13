import {ScreenDefinition} from '../Screen.js';


export interface Route {
  path: string
  // TODO: в финальном роуте будет Screen ???
  // it is screen name which will be get from AppDefinition.screens
  // of complete screen definition
  screen: string | ScreenDefinition
  params?: Record<string, any>
}
