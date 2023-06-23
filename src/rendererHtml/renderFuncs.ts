import {renderDiv} from './elemets/Div.js';
import {renderText} from './elemets/Text.js';
import {RenderedElement} from '../types/RenderedElement.js';
import {renderNavVertical} from './elemets/NavVertical.js';
import {renderNavItem} from './elemets/NavItem.js';
import {renderLayout2Col} from './elemets/Layout2Col.js';
import {ChildrenRenderer} from './types.js';


export const RENDER_FUNCS: Record<string, (el: RenderedElement, renderChild: ChildrenRenderer) => string> = {
  Div: renderDiv,
  Text: renderText,
  NavVertical: renderNavVertical,
  NavItem: renderNavItem,
  Layout2Col: renderLayout2Col,
}
