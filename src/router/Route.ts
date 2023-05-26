import {Screen} from './Screen';


export interface Route {
  path: string
  screen: Screen
  params?: Record<string, any>
}
