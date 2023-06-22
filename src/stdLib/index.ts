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
import {NavHeader} from './basic/NavHeader.js';
import {NavSub} from './basic/NavSub.js';
import {Link} from './basic/Link.js';
import {Button} from './basic/Button.js';
import {ButtonGroup} from './basic/ButtonGroup.js';


export const STD_COMPONENTS: ComponentDefinition[] = [
  // basic - reader as is
  Button,
  ButtonGroup,
  Div,
  Header,
  HorizontalNav,
  Link,
  MainSection,
  NavDelimiter,
  NavHeader,
  NavItem,
  NavSub,
  Text,
  VerticalNav,

  // wrappers - they use other components
  Router,
  Slot,

  // ForEach
  // InputText
  // InputTextArea
  // InputNumber
  // IfElse
  // ifMount
]
