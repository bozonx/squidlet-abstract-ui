import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const NavItem: ComponentDefinition = {
  name: 'NavItem',
  props: {
    value: {
      type: 'string',
      nullable: true,
    },
    icon: {
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
    'icon',
    'to',
    'showExternalIcon'
  ],
  tmpl: [
    // TODO: если указан слот то воткнуть вложенное меню - NavSub
  ]
}
