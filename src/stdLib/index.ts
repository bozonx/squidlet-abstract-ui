import {Router} from './Router.js';
import {Div} from './Div.js';
import {Text} from './Text.js';
import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Slot} from './Slot.js';
import {NavItem} from './NavItem.js';
import {VerticalNav} from './VerticalNav.js';


export const STD_COMPONENTS: ComponentDefinition[] = [
  Div,
  Router,
  Text,
  Slot,
  VerticalNav,
  NavItem,
]
