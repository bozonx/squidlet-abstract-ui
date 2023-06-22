import { Router } from './Router.js';
import { Div } from './basic/Div.js';
import { Text } from './basic/Text.js';
import { Slot } from './Slot.js';
import { NavItem } from './basic/NavItem.js';
import { NavVertical } from './basic/NavVertical.js';
import { NavHorizontal } from './basic/NavHorizontal.js';
import { NavDelimiter } from './basic/NavDelimiter.js';
import { SectionMain } from './basic/SectionMain.js';
import { Header } from './basic/Header.js';
import { NavHeader } from './basic/NavHeader.js';
import { NavSub } from './basic/NavSub.js';
import { Link } from './basic/Link.js';
import { Button } from './basic/Button.js';
import { ButtonGroup } from './basic/ButtonGroup.js';
import { InputText } from './basic/InputText.js';
import { InputTextArea } from './basic/InputTextArea.js';
import { InputNumber } from './basic/InputNumber.js';
import { InputCheckBox } from './basic/InputCheckBox.js';
export const STD_COMPONENTS = [
    // basic - reader as is
    Button,
    ButtonGroup,
    InputCheckBox,
    Div,
    Header,
    NavHorizontal,
    InputNumber,
    InputText,
    InputTextArea,
    Link,
    SectionMain,
    NavDelimiter,
    NavHeader,
    NavItem,
    NavSub,
    Text,
    NavVertical,
    // wrappers - they use other components
    Router,
    Slot,
    // ForEach
    // IfElse
    // ifMount
];
