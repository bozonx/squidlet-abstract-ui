import {renderDiv} from './elemets/Div.js';
import {renderText} from './elemets/Text.js';
import {RenderedElement} from '../types/RenderedElement.js';
import {renderNavVertical} from './elemets/NavVertical.js';
import {renderNavItem} from './elemets/NavItem.js';


export const RENDER_FUNCS: Record<string, (el: RenderedElement) => string> = {
  Div: renderDiv,
  Text: renderText,
  NavVertical: renderNavVertical,
  NavItem: renderNavItem,
}
