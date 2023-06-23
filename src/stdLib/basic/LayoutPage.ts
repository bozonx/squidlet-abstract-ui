import {ComponentDefinition} from '../../types/ComponentDefinition.js';


export const LayoutPage: ComponentDefinition = {
  name: 'LayoutPage',
  props: {
    // use 1em, or 10px etc
    pageWidth: {
      type: 'string',
    },
  },
  uiParams: [
    'pageWidth',
  ],
}
