import { omitObj } from 'squidlet-lib';
import { SuperData } from 'squidlet-sprog';
import { Component } from '../Component.js';
// TODO: получить роуте можно через props
// TODO: screen появляется в scope всех дочерних компонентов
// TODO: scope у компонентов накладывается только на root scope и на screen scope
//       и то даже можно делать не через наложение а просто подставлять в scope
//       компонента свойства - app и screen
export class ScreenComponent extends Component {
    isScreen = true;
    storage;
    get route() {
        return this.props.route;
    }
    get screen() {
        return this;
    }
    constructor(app, parent, 
    // definition component itself
    screenDefinition, 
    // slots of component which get from parent component template
    slotsDefinition) {
        // TODO: что с props
        super(app, parent, omitObj(screenDefinition, 'storage'), slotsDefinition);
        this.storage = (new SuperData(screenDefinition.storage || {})).getProxy();
    }
    async init() {
        this.storage.$super.init();
        await super.init();
    }
    async destroy(allowRender = true) {
        this.storage.$super.destroy();
        await super.destroy(allowRender);
    }
}
