import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const Header: ComponentDefinition = {
  name: 'Header',
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
