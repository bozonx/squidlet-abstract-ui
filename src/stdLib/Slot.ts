import {isEmptyObject} from 'squidlet-lib'
import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';
import {CmpInstanceDefinition} from '../types/CmpInstanceDefinition.js';
import {instantiateChildComponent} from '../helpers/componentHelper.js';
import {SLOT_DEFAULT} from '../types/constants.js';


export interface SlotsDefinition {
  default?: CmpInstanceDefinition[]
  [index: string]: CmpInstanceDefinition[] | undefined
}


class SlotComponent extends Component {

  async init() {
    if (!isEmptyObject(this.slotsDefinition)) {
      throw new Error(`You can't define slots definition to Slot component`)
    }

    await super.init()
  }


  protected instantiateChildrenComponents(): Component[] {
    if (!this.scopeComponent) throw new Error('No scopeComponent')
    else if (!this.parent) throw new Error('No parent')
    else if (isEmptyObject(this.scopeComponent.slotsDefinition)) {
      throw new Error('No slotsDefinition in scopeComponent')
    }

    const slotComponents = this.scopeComponent
      .slotsDefinition![this.props.slotName || SLOT_DEFAULT]

    if (!slotComponents) throw new Error('No any slot in scopeComponent')
    else if (!slotComponents.length) return []

    return slotComponents
      .map((el) => {
        const cmp = instantiateChildComponent(
          el,
          this.app,
          this,

          // TODO: установить правильно scopeComponent - см в Component.instantiateChildrenComponents

          this.scopeComponent!,
        )

        // TODO: лучше передать сразу в instantiateChildComponent
        // TODO: надо чтобы оно сохранило связть со своим scope
        if (this.props.params) {
          cmp.$$registerSlotParams(this.props.params)
        }

        return cmp
      })
  }
}


export const Slot: ComponentDefinition = {
  name: 'Slot',
  ComponentClass: SlotComponent,
  props: {
    // if used named slot, pet its name here
    // if not set then default will be used
    slotName: {
      type: 'string',
      required: false,
      readonly: true,
      nullable: false,
    },
    params: {
      type: 'object',
      required: false,
      readonly: true,
      nullable: false,
    },
    // TODO: add params to put to slot while executing
  },
  uiParams: ['slotName'],
}
