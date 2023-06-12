import {SuperItemDefinition} from 'squidlet-sprog';
import {Component, ComponentDefinition} from './Component.js';
import {AppSingleton} from './AppSingleton.js';
import {CmpInstanceDefinition} from './types/CmpInstanceDefinition.js';


export const ROOT_COMPONENT_ID = 'root'
export const ROOT_COMPONENT_NAME = 'root'


export class RootComponent extends Component {
  readonly isRoot: boolean = true


  constructor(
    app: AppSingleton,
    tmpl?: CmpInstanceDefinition[],
    state?: Record<string, SuperItemDefinition>
  ) {
    // root component doesn't have parent
    const parent = null as any
    //const propsStub = new SuperStruct({}).getProxy()
    const componentDefinition: ComponentDefinition = {
      name: ROOT_COMPONENT_NAME,
      state,
      tmpl,
    }

    super(app, parent, componentDefinition, {})
  }

  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
