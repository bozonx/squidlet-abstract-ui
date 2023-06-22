import {Router} from './Router.js';
import {Div} from './Div.js';
import {Text} from './Text.js';
import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Slot} from './Slot.js';
import {NavItem} from './NavItem.js';
import {VerticalNav} from './VerticalNav.js';
import {HorizontalNav} from './HorizontalNav.js';
import {NavDelimiter} from './NavDelimiter.js';
import {MainSection} from './MainSection.js';


export const STD_COMPONENTS: ComponentDefinition[] = [
  Div,
  HorizontalNav,
  MainSection,
  NavDelimiter,
  NavItem,
  Router,
  Slot,
  Text,
  VerticalNav,

  // Button
  // ButtonGroup
  // ForEach
  // IfElse
  // ifMount
  // Link
  // NavHeader
  // InputText
  // TextArea
  // NumberInput
]
