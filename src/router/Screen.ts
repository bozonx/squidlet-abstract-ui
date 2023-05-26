import {Component, ComponentDefinition} from '../Component';


export interface ScreenDefinition extends ComponentDefinition {
  components: ComponentDefinition[]
  screens: ComponentDefinition[]
}


// TODO: router and route - in props


export class Screen extends Component {
  readonly isRoot: boolean = false
  readonly isScreen: boolean = true

}
