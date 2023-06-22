import {ComponentDefinition} from '../types/ComponentDefinition.js';


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
  // tmpl: [
  //   // TODO: если нет to то ввиде кнопки
  //   {
  //     component: 'Link',
  //     value: {
  //       $exp: 'getValue',
  //       path: 'props.value',
  //     },
  //     to: {
  //       $exp: 'getValue',
  //       path: 'props.to',
  //     },
  //     showExternalIcon: {
  //       $exp: 'getValue',
  //       path: 'props.showExternalIcon',
  //     },
  //   }
  // ]
}
