import {SuperItemDefinition} from 'squidlet-sprog'
import {CmpInstanceDefinition} from './CmpInstanceDefinition.js';


// It is definition of component class
export interface ComponentDefinition {
  name: string
  // definition of props which are controlled by parent component
  props?: Record<string, SuperItemDefinition>
  // local state
  state?: Record<string, SuperItemDefinition>
  // names of params which will be sent to UI.
  // they will be got from props and state.
  // to rename or get param from component use [newName, () => { return ... }]
  // deep param path is supported
  uiParams?: (string | [string, () => any])[]
  // handlers of income ui events. Like {click: $expDefinition}
  // TODO: добавить SuperFunc и для обычной прописать аргементы
  handlers?: Record<string, () => void>
  tmpl?: CmpInstanceDefinition[]
}
