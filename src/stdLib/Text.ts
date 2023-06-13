import {ComponentDefinition} from '../types/ComponentDefinition.js';


export const Text: ComponentDefinition = {
  name: 'Text',
  props: {
    value: {
      type: 'string',
      default: '',
      nullable: true,
    }
  },
  uiParams: [ 'value' ],
}
