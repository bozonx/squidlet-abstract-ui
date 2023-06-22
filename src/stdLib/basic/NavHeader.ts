import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const NavHeader: ComponentDefinition = {
  name: 'NavHeader',
  childless: true,
  props: {
    value: {
      type: 'string',
      nullable: true,
    },
  },
  uiParams: [
    'value',
  ],
}
