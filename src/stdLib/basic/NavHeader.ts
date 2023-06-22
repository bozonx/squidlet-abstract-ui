import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const NavHeader: ComponentDefinition = {
  name: 'NavHeader',
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
