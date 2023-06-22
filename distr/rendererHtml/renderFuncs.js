import { renderDiv } from './elemets/Div.js';
import { renderText } from './elemets/Text.js';
import { renderNavVertical } from './elemets/NavVertical.js';
import { renderNavItem } from './elemets/NavItem.js';
export const RENDER_FUNCS = {
    Div: renderDiv,
    Text: renderText,
    NavVertical: renderNavVertical,
    NavItem: renderNavItem,
};
