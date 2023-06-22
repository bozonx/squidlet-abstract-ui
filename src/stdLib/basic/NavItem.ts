import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const NavItem: ComponentDefinition = {
  name: 'NavItem',
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
      nullable: true,
    }
  },
  uiParams: [
    'value',
    'to',
    'showExternalIcon'
  ],
  tmpl: [
    // TODO: если указан слот то воткнуть вложенное меню - NavSub
  ]
}
