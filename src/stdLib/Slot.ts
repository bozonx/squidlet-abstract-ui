import {isEmptyObject} from 'squidlet-lib'
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
    if (!isEmptyObject(this.slotsDefinition)) {
      throw new Error(`You can't define slots definition to Slot component`)
    }

    await super.init()
  }


  protected instantiateChildrenComponents(): Component[] {
    // TODO: как scope использовать ???
    //const scope = this.scope.$newScope(vars)

    console.log(111, this.scopeComponent?.name, this.scopeComponent?.slotsDefinition)

    if (!this.parent) throw new Error('No parent')
    else if (isEmptyObject(this.parent.slotsDefinition)) throw new Error('No slotsDefinition in parent')
    else if (!this.scopeComponent) throw new Error('No scopeComponent')

    const slotComponents = this.parent
      .slotsDefinition![this.props.name || SLOT_DEFAULT]

    if (!slotComponents) throw new Error('No any slot in parent')

    // TODO: надо чтобы props этого потомка выполнился с параметрами slot

    return slotComponents
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
  ComponentClass: SlotComponent,
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
