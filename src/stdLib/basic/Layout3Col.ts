import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const Layout3Col: ComponentDefinition = {
  name: 'LayoutThreeCol',
  props: {
    // use 1em, or 10px etc
    leftColWidth: {
      type: 'string',
    },
    centerColWidth: {
      type: 'string',
    },
    rightColWidth: {
      type: 'string',
    },
  },
  uiParams: [
    'leftColWidth',
    'centerColWidth',
    'rightColWidth',
  ],
  tmpl: [
    {
      component: 'Slot',
      slotName: 'left',
    },
    {
      component: 'Slot',
      slotName: 'center',
    },
    {
      component: 'Slot',
      slotName: 'right',
    },
  ]
}
