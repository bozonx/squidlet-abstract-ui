import {PackageContext} from '../PackageContext';
import {ROUTER_COMPONENT} from './index';


export function routerPlugin() {
  return (context: PackageContext) => {
    context.registerComponentsLib(ROUTER_COMPONENT)
  }
}
