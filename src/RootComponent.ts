import {Component, ComponentDefinition} from './Component';
import {SuperStruct} from '../../../../../../mnt/disk2/workspace/squidlet-sprog/src';
import {SlotsDefinition} from './ComponentSlotsManager';
import {ScreenDefinition} from './router/Screen';
import {AppSingleton} from './AppSingleton';


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
