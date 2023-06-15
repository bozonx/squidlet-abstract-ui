import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';


// TODO: это вставка именнованного или default slot
// TODO: он должен брать slots из scopeComponent
// TODO: все элементы должны получить scopeComponent тот который у Slot установлен
//       как scopeComponent
// TODO: тоже касается и всех вложенных Slot


class SlotComponent extends Component {

  // TODO: а как быть с потомками они же всеравно должны отрендериться????

}


export const Slot: ComponentDefinition = {
  name: 'Slot',
  Component: SlotComponent,
}
