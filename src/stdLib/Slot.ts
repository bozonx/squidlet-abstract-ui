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

  // TODO: нельзя передавать slotsDefinition - ошибка
  // TODO: нужно взять slotDefinition из parent
  //  и выполнить в scopedComponent.execSlot()

  async init() {
    await super.init()


  }


  protected instantiateChildrenComponents(): Component[] {
    let cmpDefinitions: CmpInstanceDefinition[] = []

    //const scope = this.scope.$newScope(vars)

    // TODO: как scope использовать ???
    // TODO: наверное его подменить у компонента
    // TODO: а если такой компонент есть, то ему подменить scope ???
    // TODO: надо проверить есть ли такой компонент и если нет то тогда создать
    // TODO: или получается что Slot просто их создает как своих потомков

    if (!this.parent) throw new Error('No parent')
    else if (!this.parent.slotsDefinition) throw new Error('No slotsDefinition in parent')

    const slot: CmpInstanceDefinition[] | undefined = this.parent
      .slotsDefinition[this.props.name || SLOT_DEFAULT]

    if (!slot) throw new Error('No any slot in parent')

    return cmpDefinitions
      .map((el) => instantiateChildComponent(
        el,
        this.app,
        this,
        // all my direct children in my scope
        this
      ))
  }

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
