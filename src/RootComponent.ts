import {SuperItemInitDefinition} from 'squidlet-sprog';
import {Component} from './Component.js';
import {AppSingleton} from './AppSingleton.js';
import {CmpInstanceDefinition} from './types/CmpInstanceDefinition.js';
import {ComponentDefinition} from './types/ComponentDefinition.js';
import {AppContext} from './AppContext.js';


export const ROOT_COMPONENT_ID = 'root'
export const ROOT_COMPONENT_NAME = 'Root'


// TODO: сделать app context доступным в scope всех потомков


export class RootComponent extends Component {
  readonly isRoot: boolean = true
  readonly appContext: AppContext


  constructor(
    app: AppSingleton,
    tmpl?: CmpInstanceDefinition[],
    state?: Record<string, SuperItemInitDefinition>
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

    this.appContext = new AppContext(app)
  }

  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
