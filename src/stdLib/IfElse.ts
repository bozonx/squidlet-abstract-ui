import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';


// TODO: это компонент обертка над ifElse из sprog
//       он делает destroy компоненты


class IfElseComponent extends Component {

}


export const IfElse: ComponentDefinition = {
  name: 'IfElse',
  ComponentClass: IfElseComponent,
}
