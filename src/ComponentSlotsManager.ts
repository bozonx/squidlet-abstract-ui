import {UiElementDefinition} from './types/CmpInstanceDefinition';


export interface SlotsDefinition {
  default?: UiElementDefinition[]
  [index: string]: UiElementDefinition[] | undefined
}


export class ComponentSlotsManager {
  private slotsDefinition: SlotsDefinition


  constructor(slotsDefinition: SlotsDefinition) {
    this.slotsDefinition = slotsDefinition
  }

  async init(scope: Record<any, any>) {

  }

  async destroy() {

  }


  getDefaultDefinition(): UiElementDefinition[] | undefined {
    return this.slotsDefinition.default
  }

}
