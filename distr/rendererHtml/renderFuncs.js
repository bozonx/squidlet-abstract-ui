import { renderDiv } from './elemets/Div.js';
import { renderText } from './elemets/Text.js';
import { renderNavVertical } from './elemets/NavVertical.js';
import { renderNavItem } from './elemets/NavItem.js';
import { renderLayout2Col } from './elemets/Layout2Col.js';
import { renderLayout3Col } from './elemets/Layout3Col.js';
import { renderLayoutPage } from './elemets/LayoutPage.js';
import { renderHeader } from './elemets/Header.js';
import { renderSectionMain } from './elemets/SectionMain.js';
import { renderLink } from './elemets/Link.js';
import { renderButton } from './elemets/Button.js';
import { renderButtonGroup } from './elemets/ButtonGroup.js';
export const RENDER_FUNCS = {
    Button: renderButton,
    ButtonGroup: renderButtonGroup,
    Div: renderDiv,
    Header: renderHeader,
    Layout2Col: renderLayout2Col,
    Layout3Col: renderLayout3Col,
    LayoutPage: renderLayoutPage,
    Link: renderLink,
    NavItem: renderNavItem,
    NavVertical: renderNavVertical,
    SectionMain: renderSectionMain,
    Text: renderText,
};
