import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const Layout2Col: ComponentDefinition = {
  name: 'Layout2Col',
  props: {
    // use 1em, or 10px etc
    leftColWidth: {
      type: 'string',
    },
    rightColWidth: {
      type: 'string',
    },
  },
  uiParams: [
    'leftColWidth',
    'rightColWidth',
  ],
  tmpl: [
    {
      component: 'Slot',
      name: 'left',
    },
    {
      component: 'Slot',
      name: 'right',
    },
  ]
}
