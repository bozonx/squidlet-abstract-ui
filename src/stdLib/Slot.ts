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


    if (!this.scopeComponent) throw new Error('No scopeComponent')
    else if (!this.parent) throw new Error('No parent')
    else if (isEmptyObject(this.scopeComponent.slotsDefinition)) {
      throw new Error('No slotsDefinition in scopeComponent')
    }

    let slotComponents

    if (this.props.tmplReplacement) {
      slotComponents = this.parent
        .slotsDefinition![this.props.name || SLOT_DEFAULT]
    }
    else {
      slotComponents = this.scopeComponent
        .slotsDefinition![this.props.name || SLOT_DEFAULT]
    }


    console.log(111, this.scopeComponent?.name, this.scopeComponent?.slotsDefinition,
      this.props, this.name, this.initialProps, slotComponents, this.props.tmplReplacement
    )

    if (!slotComponents) throw new Error('No any slot in scopeComponent')

    // TODO: надо чтобы props этого потомка выполнился с параметрами slot

    // TODO: установить правильно scopeComponent

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
    tmplReplacement: {
      type: 'boolean',
      default: false,
      required: false,
      readonly: true,
      nullable: false,
    },
    // TODO: add params to put to slot while executing
  }
}
