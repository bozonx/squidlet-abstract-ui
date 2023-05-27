import {SuperStruct, newScope} from 'squidlet-sprog';
import {Component, ComponentDefinition} from './Component.js';
import {AppSingleton} from './AppSingleton.js';
import {ScreenDefinition} from './routerBase/Screen.js';


// TODO: может это screen?

export interface RootComponentDefinition extends ComponentDefinition {
  // it is just app's components lib
  components?: ComponentDefinition[]
  // it is just app's screens lib
  screens?: ScreenDefinition[]
}


export const ROOT_COMPONENT_ID = 'root'


export class RootComponent extends Component {
  readonly isRoot: boolean = true


  constructor(app: AppSingleton) {
    const componentDefinition: ComponentDefinition = app
      .getComponentDefinition(ROOT_COMPONENT_ID)
    // TODO: не очень хорошо так делать
    const parent = null as any
    // TODO: а чё всмысле???
    const props = new SuperStruct(newScope(), {}).getProxy()

    super(app, parent, componentDefinition, {}, props)
    // replace scope of props to make it the same as RootComponent's
    props.$super.$$replaceScope(this.scope)
  }


  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
