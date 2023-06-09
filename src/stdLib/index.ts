import {Router} from './Router.js';
import {Div} from './basic/Div.js';
import {Text} from './basic/Text.js';
import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Slot} from './Slot.js';
import {NavItem} from './basic/NavItem.js';
import {NavVertical} from './basic/NavVertical.js';
import {NavHorizontal} from './basic/NavHorizontal.js';
import {NavDelimiter} from './basic/NavDelimiter.js';
import {SectionMain} from './basic/SectionMain.js';
import {Header} from './basic/Header.js';
import {NavHeader} from './basic/NavHeader.js';
import {NavSub} from './basic/NavSub.js';
import {Link} from './basic/Link.js';
import {Button} from './basic/Button.js';
import {ButtonGroup} from './basic/ButtonGroup.js';
import {InputText} from './basic/InputText.js';
import {InputTextArea} from './basic/InputTextArea.js';
import {InputNumber} from './basic/InputNumber.js';
import {InputCheckBox} from './basic/InputCheckBox.js';
import {Layout2Col} from './basic/Layout2Col.js';
import {Layout3Col} from './basic/Layout3Col.js';
import {Tabs} from './basic/Tabs.js';
import {LayoutTabs} from './basic/LayoutTabs.js';
import {LayoutPage} from './basic/LayoutPage.js';
import {LayoutBottomTabs} from './basic/LayoutBottomTabs.js';
import {LayoutDrawer} from './basic/LayoutDrawer.js';
import {Drawer} from './basic/Drawer.js';
import {LayoutModal} from './basic/LayoutModal.js';
import {IfElse} from './IfElse.js';
import {IfMount} from './ifMount.js';
import {ForEach} from './ForEach.js';


export const STD_COMPONENTS: ComponentDefinition[] = [
  // basic - reader as is
  Button,
  ButtonGroup,
  Div,
  Drawer,
  Header,
  InputCheckBox,
  InputNumber,
  InputText,
  InputTextArea,
  Layout2Col,
  Layout3Col,
  LayoutBottomTabs,
  LayoutDrawer,
  LayoutModal,
  LayoutPage,
  LayoutTabs,
  Link,
  NavDelimiter,
  NavHeader,
  NavHorizontal,
  NavItem,
  NavSub,
  NavVertical,
  SectionMain,
  Tabs,
  Text,

  // wrappers - they use other components

  // system components
  Router,
  Slot,
  IfElse,
  IfMount,
  ForEach,
]
