import {SuperStruct} from 'squidlet-sprog';
import {Component, ComponentDefinition} from './Component.js';
import {SlotsDefinition} from './ComponentSlotsManager.js';
import {ScreenDefinition} from './router/Screen.js';
import {AppSingleton} from './AppSingleton.js';


// TODO: может это screen?


export interface RootComponentDefinition extends ComponentDefinition {
  components?: ComponentDefinition[]
  screens?: ScreenDefinition[]
}


export const ROOT_COMPONENT_ID = 'root'


export class RootComponent extends Component {
  readonly isRoot: boolean = true
  readonly id = ROOT_COMPONENT_ID
  //readonly uiElId = ROOT_COMPONENT_ID


  constructor(app: AppSingleton) {
    const slots: SlotsDefinition = {
      // TODO: правильно ???
      default: componentDefinition.tmpl
    }
    // TODO: не очень хорошо так делать
    const parent = null as any

    super(app, parent, componentDefinition, slots, new SuperStruct({}))
  }


  init() {
    //, componentDefinition: ComponentDefinition
    //this.app.getComponentDefinition(ROOT_COMPONENT_ID)
  }

  protected makeId(): string {
    return ROOT_COMPONENT_ID
  }

}
