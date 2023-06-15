import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';
import {CmpInstanceDefinition} from '../types/CmpInstanceDefinition.js';
import {instantiateChildComponent} from '../helpers/componentHelper.js';


class SlotComponent extends Component {

  // TODO: нужно взять slotDefinition из parent
  //  и выполнить в scopedComponent.execSlot()

  /**
   * Execute slot of some deep child component slot.
   * @param slotDefinitionToRender
   * @param parent
   * @param vars - some variables which will be put so scope where slot will be executed
   */
  async execSlot(
    slotDefinitionToRender: CmpInstanceDefinition[],
    parent: Component,
    vars?: Record<string, any>
  ) {
    const scope = this.scope.$newScope(vars)

    // TODO: как scope использовать ???
    // TODO: наверное его подменить у компонента
    // TODO: а если такой компонент есть, то ему подменить scope ???
    // TODO: наверное эту ф-ю выполнять в Slot компоненте

    return slotDefinitionToRender.map((el) => instantiateChildComponent(
      el,
      this.app,
      parent,
      this,
    ))
  }

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
