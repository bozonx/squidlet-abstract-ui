import {SuperItemInitDefinition, SprogDefinition, SuperFuncDefinition} from 'squidlet-sprog'
import {CmpInstanceDefinition} from './CmpInstanceDefinition.js';


// It is definition of component class
export interface ComponentDefinition {
  name: string
  // definition of props which are controlled by parent component
  props?: Record<string, SuperItemInitDefinition>
  // local state
  state?: Record<string, SuperItemInitDefinition>
  // names of params which will be sent to UI.
  // they will be got from props and state.
  // to rename or get param from component use [newName, () => { return ... }]
  // deep param path is supported
  uiParams?: (string | [string, () => any])[]
  // handlers of income ui events or custom events
  // These handlers will be called in component scope
  handlers?: Record<string, SuperFuncDefinition>
  tmpl?: CmpInstanceDefinition[]
  // Life cycle callbacks. They are just sprog line which will be called
  // with component's scope
  // it will be run after initialization
  onInit?: SprogDefinition[]
  // it will be run before mount
  onMount?: SprogDefinition[]
  // it will be run before umount
  onUnmount?: SprogDefinition[]
  // it will be run before destroy
  onDestroy?: SprogDefinition[]
}
