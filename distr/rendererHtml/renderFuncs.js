import { renderDiv } from './elemets/Div.js';
import { renderText } from './elemets/Text.js';
import { renderNavVertical } from './elemets/NavVertical.js';
import { renderNavItem } from './elemets/NavItem.js';
import { renderLayout2Col } from './elemets/Layout2Col.js';
import { renderLayout3Col } from './elemets/Layout3Col.js';
export const RENDER_FUNCS = {
    Div: renderDiv,
    Text: renderText,
    NavVertical: renderNavVertical,
    NavItem: renderNavItem,
    Layout2Col: renderLayout2Col,
    Layout3Col: renderLayout3Col,
};
