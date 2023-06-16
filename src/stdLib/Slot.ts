import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';
import {CmpInstanceDefinition} from '../types/CmpInstanceDefinition.js';
import {instantiateChildComponent} from '../helpers/componentHelper.js';


export interface SlotsDefinition {
  default?: CmpInstanceDefinition[]
  [index: string]: CmpInstanceDefinition[] | undefined
}


export const SLOT_DEFAULT = 'default'


class SlotComponent extends Component {

  async init() {
    if (this.slotsDefinition) {
      throw new Error(`You can't define slots definition to Slot component`)
    }

    await super.init()
  }


  protected instantiateChildrenComponents(): Component[] {
    let cmpDefinitions: CmpInstanceDefinition[] = []

    // TODO: как scope использовать ???
    //const scope = this.scope.$newScope(vars)

    if (!this.parent) throw new Error('No parent')
    else if (!this.parent.slotsDefinition) throw new Error('No slotsDefinition in parent')
    else if (!this.scopeComponent) throw new Error('No scopeComponent')

    const slot = this.parent
      .slotsDefinition[this.props.name || SLOT_DEFAULT]

    if (!slot) throw new Error('No any slot in parent')

    // TODO: надо чтобы props этого потомка выполнился с параметрами slot

    return cmpDefinitions
      .map((el) => instantiateChildComponent(
        el,
        this.app,
        this,
        this.scopeComponent!
      ))
  }
}


export const Slot: ComponentDefinition = {
  name: 'Slot',
  Component: SlotComponent,
  props: {
    // if used named slot, pet its name here
    // if not set then default will be used
    name: {
      type: 'string',
      required: false,
      readonly: true,
      nullable: false,
    },
    // TODO: add params to put to slot while executing
  }
}
