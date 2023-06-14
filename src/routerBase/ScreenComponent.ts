import {omitObj} from 'squidlet-lib';
import {SuperItemInitDefinition, ProxyfiedData, SuperData} from 'squidlet-sprog'
import {Component} from '../Component.js';
import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {AppSingleton} from '../AppSingleton.js';
import {SlotsDefinition} from '../ComponentSlotsManager.js';
import {Route} from '../types/Route.js';


export interface ScreenDefinition extends ComponentDefinition {
  /**
   * This is storage of screen which can be accessed by any deep child
   */
  storage?: Record<string, SuperItemInitDefinition>
}


// TODO: получить роуте можно через props
// TODO: screen появляется в scope всех дочерних компонентов
// TODO: scope у компонентов накладывается только на root scope и на screen scope
//       и то даже можно делать не через наложение а просто подставлять в scope
//       компонента свойства - app и screen


export class ScreenComponent extends Component {
  readonly isScreen: boolean = true
  readonly storage: ProxyfiedData

  get route(): Route {
    return this.props.route
  }

  get screen(): ScreenComponent | undefined {
    return this
  }


  constructor(
    app: AppSingleton,
    parent: Component,
    // definition component itself
    screenDefinition: ScreenDefinition,
    // slots of component which get from parent component template
    slotsDefinition: SlotsDefinition,
  ) {
    // TODO: что с props
    super(app, parent, omitObj(screenDefinition, 'storage') as ComponentDefinition, slotsDefinition)

    this.storage = (new SuperData(screenDefinition.storage || {})).getProxy()
  }


  async init() {
    this.storage.$super.init()

    await super.init()
  }

  async destroy(allowRender: boolean = true) {
    this.storage.$super.destroy()

    await super.destroy(allowRender)
  }

}
