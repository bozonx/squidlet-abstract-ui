import {Router} from './Router.js';
import {Div} from './basic/Div.js';
import {Text} from './basic/Text.js';
import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Slot} from './Slot.js';
import {NavItem} from './basic/NavItem.js';
import {VerticalNav} from './basic/VerticalNav.js';
import {HorizontalNav} from './basic/HorizontalNav.js';
import {NavDelimiter} from './basic/NavDelimiter.js';
import {MainSection} from './basic/MainSection.js';
import {Header} from './basic/Header.js';


export const STD_COMPONENTS: ComponentDefinition[] = [
  // basic - reader as is
  Div,
  Header,
  HorizontalNav,
  MainSection,
  NavDelimiter,
  NavItem,
  Text,
  VerticalNav,
  // wrappers - use other components
  Router,
  Slot,

  // Button
  // ButtonGroup
  // ForEach
  // IfElse
  // ifMount
  // Link
  // NavHeader
  // InputText
  // InputTextArea
  // InputNumber
]
