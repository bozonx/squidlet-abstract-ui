import {SuperStruct} from 'squidlet-sprog';
import {pickObj} from 'squidlet-lib';
import {Component} from './Component.js';
import {AppSingleton} from './AppSingleton.js';
import {ComponentDefinition} from './types/ComponentDefinition.js';
import {AppDefinition} from './types/AppDefinition.js';


export const ROOT_COMPONENT_ID = 'root'
export const ROOT_COMPONENT_NAME = 'Root'


export class RootComponent extends Component {
  readonly isRoot: boolean = true


  constructor(
    app: AppSingleton,
    appDefinition: AppDefinition,
  ) {
    // root component doesn't have parent
    const parent = null as any
    const componentDefinition: ComponentDefinition = {
      name: ROOT_COMPONENT_NAME,
      ...pickObj(
        appDefinition,
        'ComponentClass',
        'state',
        'handlers',
        'tmpl',
        'onInit',
        'onMount',
        'onUnmount',
        'onDestroy',
        'onUpdate'
      ),
    }

    super(app, parent, componentDefinition, {})
  }

  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
