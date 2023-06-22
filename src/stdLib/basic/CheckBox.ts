import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const CheckBox: ComponentDefinition = {
  name: 'CheckBox',
  childless: true,
  props: {
    value: {
      type: 'boolean',
      nullable: true,
      default: false,
    },
    label: {
      type: 'string',
      nullable: true,
    },
    hint: {
      type: 'string',
      nullable: true,
    },
    disabled: {
      type: 'boolean',
      default: false,
    },
  },
  uiParams: [
    'value',
    'label',
    'hint',
    'disabled',
  ],
}
