import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';


// TODO: это вставка именнованного или default slot
// TODO: он должен брать slots из scopeComponent
// TODO: все элементы должны получить scopeComponent тот который у Slot установлен
//       как scopeComponent
// TODO: тоже касается и всех вложенных Slot


class SlotComponent extends Component {

  // TODO: нужно взять slotDefinition из parent и выполнить в scopedComponent

}


export const Slot: ComponentDefinition = {
  name: 'Slot',
  Component: SlotComponent,
}
