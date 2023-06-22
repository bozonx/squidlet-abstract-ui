import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const Link: ComponentDefinition = {
  name: 'Link',
  childless: true,
  props: {
    value: {
      type: 'string',
      nullable: true,
    },
    to: {
      type: 'string',
      nullable: true,
    },
    showExternalIcon: {
      type: 'boolean',
      default: true,
    }
  },
  uiParams: [
    'value',
    'to',
    'showExternalIcon'
  ],
}
