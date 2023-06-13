import {omitObj} from 'squidlet-lib';
import {SuperItemInitDefinition, ProxyfiedData, SuperData} from 'squidlet-sprog'
import {Component} from './Component.js';
import {ComponentDefinition} from './types/ComponentDefinition.js';
import {AppSingleton} from './AppSingleton.js';
import {SlotsDefinition} from './ComponentSlotsManager.js';
import {Route} from './types/Route.js';


export interface ScreenDefinition extends ComponentDefinition {
  context?: Record<string, SuperItemInitDefinition>
}


// TODO: получить роуте можно через props
// TODO: screen появляется в scope всех дочерних компонентов


export class Screen extends Component {
  readonly isScreen: boolean = true
  readonly context: ProxyfiedData

  get route(): Route {
    return this.props.route
  }


  constructor(
    app: AppSingleton,
    parent: Component,
    // definition component itself
    screenDefinition: ScreenDefinition,
    // slots of component which get from parent component template
    slotsDefinition: SlotsDefinition,
  ) {
    super(app, parent, omitObj(screenDefinition, 'context') as ComponentDefinition, slotsDefinition)

    this.context = (new SuperData(screenDefinition.context || {})).getProxy()
  }

}
