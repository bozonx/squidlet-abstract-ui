import {ComponentDefinition} from '../types/ComponentDefinition.js';


export const Text: ComponentDefinition = {
  name: 'Text',
  childless: true,
  props: {
    value: {
      type: 'string',
      default: '',
      nullable: true,
    }
  },
  uiParams: [ 'value' ],
}
