import {SuperStruct, newScope} from 'squidlet-sprog';
import {Component, ComponentDefinition} from './Component.js';
import {SlotsDefinition} from './ComponentSlotsManager.js';
import {ScreenDefinition} from './routerBase/Screen.js';
import {AppSingleton} from './AppSingleton.js';


// TODO: может это screen?


// export interface RootComponentDefinition extends ComponentDefinition {
//   components?: ComponentDefinition[]
//   screens?: ScreenDefinition[]
// }


export const ROOT_COMPONENT_ID = 'root'


export class RootComponent extends Component {
  readonly isRoot: boolean = true
  readonly id = ROOT_COMPONENT_ID
  //readonly uiElId = ROOT_COMPONENT_ID


  constructor(
    app: AppSingleton,
    componentDefinition: ComponentDefinition,
  ) {
    const slots: SlotsDefinition = {
      // TODO: правильно ???
      default: componentDefinition.tmpl
    }
    // TODO: не очень хорошо так делать
    const parent = null as any
    // TODO: а чё всмысле???
    const props = new SuperStruct(newScope(), {}).getProxy()

    super(app, parent, componentDefinition, slots, props)
  }


  async init() {
    //, componentDefinition: ComponentDefinition
    //this.app.getComponentDefinition(ROOT_COMPONENT_ID)
    await super.init()
  }

  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
