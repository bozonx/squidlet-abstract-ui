import {PackageContext} from '../PackageContext';
import {GOOD_UI} from './index';


export function goodUiPlugin() {
  return (context: PackageContext) => {
    context.registerComponentsLib(GOOD_UI)
  }
}
