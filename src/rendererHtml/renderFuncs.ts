import {renderDiv} from './elemets/Div.js';
import {renderText} from './elemets/Text.js';
import {RenderedElement} from '../types/RenderedElement.js';
import {renderNavVertical} from './elemets/NavVertical.js';
import {renderNavItem} from './elemets/NavItem.js';
import {renderLayout2Col} from './elemets/Layout2Col.js';
import {ChildrenRenderer} from './types.js';
import {renderLayout3Col} from './elemets/Layout3Col.js';
import {renderLayoutPage} from './elemets/LayoutPage.js';
import {renderHeader} from './elemets/Header.js';
import {renderSectionMain} from './elemets/SectionMain.js';
import {renderLink} from './elemets/Link.js';


export const RENDER_FUNCS: Record<string, (el: RenderedElement, renderChild: ChildrenRenderer) => string> = {
  Div: renderDiv,
  Text: renderText,
  Link: renderLink,
  Header: renderHeader,
  NavVertical: renderNavVertical,
  NavItem: renderNavItem,
  Layout2Col: renderLayout2Col,
  Layout3Col: renderLayout3Col,
  LayoutPage: renderLayoutPage,
  SectionMain: renderSectionMain,
}
