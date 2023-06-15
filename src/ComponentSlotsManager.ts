import {CmpInstanceDefinition} from './types/CmpInstanceDefinition.js';


export interface SlotsDefinition {
  default?: CmpInstanceDefinition[]
  [index: string]: CmpInstanceDefinition[] | undefined
}


// TODO: походу не нужно

export class ComponentSlotsManager {
  private slotsDefinition: SlotsDefinition


  constructor(slotsDefinition: SlotsDefinition = {}) {
    this.slotsDefinition = slotsDefinition
  }

  // async init(scope: Record<any, any>) {
  //
  // }

  async destroy() {
    // TODO: ???
  }


  getDefaultDefinition(): CmpInstanceDefinition[] | undefined {
    return this.slotsDefinition.default
  }

}
