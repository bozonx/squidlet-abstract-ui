import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';


// TODO: это компонент в виде ifElse но только не уничтожает компонент а делает
//       mount or unmount


class IfMountComponent extends Component {

}


export const IfMount: ComponentDefinition = {
  name: 'IfMount',
  ComponentClass: IfMountComponent,
}
