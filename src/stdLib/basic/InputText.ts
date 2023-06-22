import {ComponentDefinition} from '../../types/ComponentDefinition.js';


// TODO: add validation rules


export const InputText: ComponentDefinition = {
  name: 'InputText',
  childless: true,
  props: {
    value: {
      type: 'string',
      nullable: true,
    },
    placeholder: {
      type: 'string',
      nullable: true,
    },
    label: {
      type: 'string',
      nullable: true,
    },
    hint: {
      type: 'string',
      nullable: true,
    },
    errorMsg: {
      type: 'string',
      nullable: true,
    },
    leftIcon: {
      type: 'string',
      nullable: true,
    },
    rightIcon: {
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
    'placeholder',
    'label',
    'hint',
    'errorMsg',
    'leftIcon',
    'rightIcon',
    'disabled',
  ],
}
