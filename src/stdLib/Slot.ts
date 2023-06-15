import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';


class SlotComponent extends Component {

  // TODO: нужно взять slotDefinition из parent
  //  и выполнить в scopedComponent.execSlot()

}


export const Slot: ComponentDefinition = {
  name: 'Slot',
  Component: SlotComponent,
  props: {
    name: {
      type: 'string',
      required: false,
      readonly: true,
      nullable: false,
    },
    // TODO: add params to put to slot while executing
  }
}
