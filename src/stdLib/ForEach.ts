import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {Component} from '../Component.js';


class ForEachComponent extends Component {

}


export const ForEach: ComponentDefinition = {
  name: 'ForEach',
  ComponentClass: ForEachComponent,
}

/*
props:

    src:
      $exp: getProp
      path: children
    do:
      $exp: newSuperFunc
      lines:
        - $exp: funcReturn
          value:
            $exp: getJsValue
            path: item

  src:
    type: any[]
#  as:
#    type: string
  item:
    type: Component
tmpl:
  - $exp: forEach
    src:
      $exp: getProp
      path: src
    as:
      $exp: getProp
      path: as
    do:
      $exp: newSuperFunc
      lines:
        -
#tmplExp: 'for (const item of src) this.main.newComponentFromTmpl(item)'
 */
