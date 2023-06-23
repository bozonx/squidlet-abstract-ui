import { newScope, SuperStruct, SuperArray, SuperData, SuperFunc, removeExpressions, removeSimple, All_TYPES } from 'squidlet-sprog';
import { omitUndefined, makeUniqId, IndexedEventEmitter, isEmptyObject, isSameDeep } from 'squidlet-lib';
import { DOM_EVENTS_DEFINITIONS } from './types/IncomeEvent.js';
import { COMPONENT_ID_BYTES_NUM, SLOT_DEFAULT } from './types/constants.js';
import { instantiateChildComponent, makeComponentUiParams, renderComponentBase } from './helpers/componentHelper.js';
import { RenderEvents } from './types/RenderEvents.js';
export var COMPONENT_EVENTS;
(function (COMPONENT_EVENTS) {
    COMPONENT_EVENTS[COMPONENT_EVENTS["initStart"] = 0] = "initStart";
    COMPONENT_EVENTS[COMPONENT_EVENTS["initFinished"] = 1] = "initFinished";
    COMPONENT_EVENTS[COMPONENT_EVENTS["mounted"] = 2] = "mounted";
    COMPONENT_EVENTS[COMPONENT_EVENTS["unmounted"] = 3] = "unmounted";
    // any changes of component's props of state or children array
    COMPONENT_EVENTS[COMPONENT_EVENTS["update"] = 4] = "update";
    // start destroying of component. It will not emit unmount because it means unmount too.
    COMPONENT_EVENTS[COMPONENT_EVENTS["destroy"] = 5] = "destroy";
})(COMPONENT_EVENTS = COMPONENT_EVENTS || (COMPONENT_EVENTS = {}));
/**
 * All the items of Abstract UI are components or inherit it.
 * Each UI element which is sent to renderer is component, but renderer can
 * render it as several elements if needs, but it actually doesn't matter.
 */
export class Component {
    isRoot = false;
    // componentId
    id;
    events = new IndexedEventEmitter();
    // ordered children in super array. Add, remove or reorder children will
    // emit an array's change event
    children;
    // Parent of this component. If it is root then it will be null
    parent;
    scopeComponent;
    // Props values set in the parent tmpl
    props;
    slotsDefinition;
    // local state of component instance
    // please do not use it as public property
    state;
    // It is scope for template runtime
    // please do not use it as public property
    scope;
    // does props have super array, struct or super data
    // do not change it please
    //hasReactiveProps: boolean = false
    // it uses only by parent to set props. Don't use it by yourself
    $$propsSetter;
    app;
    // component's class definition
    componentDefinition;
    incomeEventListenerIndex;
    // TODO: сделать обратно private
    initialProps;
    lastRender;
    slotParams = {};
    /**
     * component name. The same as in template and component definition
     */
    get name() {
        return this.componentDefinition.name;
    }
    get mounted() {
        return typeof this.incomeEventListenerIndex !== 'undefined';
    }
    get screen() {
        return this.parent && this.parent.screen;
    }
    constructor(app, parent, 
    // definition component itself
    componentDefinition, initialProps, 
    // slots of component which get from parent component template
    slotsDefinition, 
    // component which renders its template where this component is
    scopeComponent) {
        this.app = app;
        this.parent = parent;
        this.scopeComponent = scopeComponent;
        this.componentDefinition = componentDefinition;
        this.initialProps = initialProps;
        this.id = this.makeId();
        this.slotsDefinition = slotsDefinition;
        this.props = (new SuperStruct(componentDefinition.props || {}, true)).getProxy();
        this.state = (new SuperData(componentDefinition.state)).getProxy();
        this.scope = newScope({
            props: this.props,
            state: this.state,
            app: this.app.context,
            screen: this.screen,
            component: this,
            // emit custom output event which will catch scopeComponent
            emit: this.emit,
        });
        this.children = (new SuperArray({
            // TODO: поидее надо тип Component
            type: 'object',
            readonly: false,
            nullable: false,
        })).getProxy();
    }
    async init() {
        this.events.emit(COMPONENT_EVENTS.initStart);
        this.props.subscribe((target, path) => {
            // Listen to changes in props
        });
        this.state.subscribe((target, path) => {
            // Listen to changes in state
        });
        this.children.subscribe((target, path) => {
            // Listen to changes in children
        });
        // TODO: родитель должен понять что ребенок дестроится и разорвать связь у себя
        //       и удалить его у себя
        this.$$propsSetter = this.props.$super.init(removeExpressions(this.initialProps));
        //this.hasReactiveProps = this.props.$super.hasSuperValueDeepChildren()
        this.props.subscribe(() => this.handleAnyChange());
        this.state.subscribe(() => this.handleAnyChange());
        this.children.$super.onArrayChange(() => this.handleAnyChange());
        this.state.$super.init();
        this.children.$super.init(this.instantiateChildrenComponents());
        // init all the children components
        for (const child of this.children)
            await child.init();
        this.events.emit(COMPONENT_EVENTS.initFinished);
        if (this.componentDefinition.onInit) {
            await this.runSprogCallback(this.componentDefinition.onInit);
        }
    }
    /**
     * Destroy my and all the my children.
     * It will not rise unmount. You have to listen destroying component to totaly
     * remove it. And umount means that component doesn't remove from memory.
     */
    async destroy(allowRender = true) {
        if (this.componentDefinition.onDestroy) {
            await this.runSprogCallback(this.componentDefinition.onDestroy);
        }
        this.events.emit(COMPONENT_EVENTS.destroy);
        this.events.destroy();
        this.stopListenIncomeEvents();
        // destroy all the children without emitting render events
        for (const component of this.children)
            await component.destroy(false);
        this.children.$super.destroy();
        this.scope.$super.destroy();
        // props and state are destroyed as scope children
        // emit component destroy event
        if (allowRender) {
            this.app.$$render(RenderEvents.destroy, renderComponentBase(this));
        }
    }
    $$registerSlotParamsScope(slotName, slotScope) {
        this.slotParams[slotName] = slotScope;
    }
    /**
     * Emit custom event to scopeComponent
     */
    emit = (eventName, params) => {
        if (!this.scopeComponent)
            return;
        this.scopeComponent.incomeEvent({
            name: eventName,
            params: params,
            target: this,
        });
    };
    /**
     * Mount this component's element.
     * Actually means emit mount event and listen element's income events.
     */
    async mount(allowRender = true) {
        // update props
        if (this.scopeComponent) {
            await this.props.$super.execute(this.scopeComponent.scope, removeSimple(this.initialProps));
        }
        if (this.componentDefinition.onMount) {
            await this.runSprogCallback(this.componentDefinition.onMount);
        }
        // start listening income events
        this.incomeEventListenerIndex = this.app.events.addListener(this.app.makeIncomeEventName(this.id), this.incomeEvent);
        // mount child always silent
        for (const child of this.children)
            await child.mount(false);
        if (allowRender) {
            this.app.$$render(RenderEvents.mount, this.render());
        }
        this.events.emit(COMPONENT_EVENTS.mounted);
    }
    /**
     * Unmount this component's element.
     * Means stop listenint ui change events and But the component won't be destroyed
     */
    async unmount(allowRender = true) {
        if (this.componentDefinition.onUnmount) {
            await this.runSprogCallback(this.componentDefinition.onUnmount);
        }
        this.stopListenIncomeEvents();
        // unmount child always silent
        for (const child of this.children)
            await child.unmount(false);
        if (allowRender) {
            this.app.$$render(RenderEvents.unMount, renderComponentBase(this));
        }
        this.events.emit(COMPONENT_EVENTS.unmounted);
    }
    /**
     * Get position of child by its component id.
     * -1 means - can't find child
     */
    getIndexOfChild(childComponentId) {
        return this.children.findIndex((el) => el.id === childComponentId);
    }
    /**
     * Make full render element with children
     */
    render() {
        return omitUndefined({
            ...this.renderSelf(),
            children: this.renderChildren(),
        });
    }
    /**
     * Make render element only for itself without children
     */
    renderSelf() {
        return omitUndefined({
            ...renderComponentBase(this),
            params: makeComponentUiParams(this.componentDefinition, this.props, this.state),
        });
    }
    /**
     * Handle event which income from frontend or other custom events from components
     * It will call corresponding event handler which is set in component definition.
     * @param event
     */
    incomeEvent = (event) => {
        (async () => {
            const handlerDefinition = this.componentDefinition
                ?.handlers?.[event.name];
            if (!handlerDefinition)
                return;
            const domEventPropsDefinitions = DOM_EVENTS_DEFINITIONS[event.name];
            if (domEventPropsDefinitions && handlerDefinition.params) {
                throw new Error(`You can't set props for DOM events, use redefine instead`);
            }
            const paramsDefinitions = {
                ...(domEventPropsDefinitions || handlerDefinition.params),
                event: {
                    type: All_TYPES.object,
                    readonly: true,
                }
            };
            const superFunc = new SuperFunc(this.scope, paramsDefinitions, handlerDefinition.lines, 
            // TODO: а зачем нужен redefine если всеравно всё будет в params. ???
            handlerDefinition.redefine);
            // , params: event.params
            // TODO: какаято путаница с event и params
            await superFunc.exec({ event });
        })()
            .catch(this.app.log.error);
    };
    /**
     * This is called from parent on any chage of scoped component
     */
    async handlePropsChange(scopedComponent) {
        // TODO: hasReactiveProps может быть any и меняться в рантайме
        //        надо как-то проверить заранее, но если есть any то проверять каждый раз
        //        наверное сделать this.staticProps - если нет any и super types
        //const hasReactiveProps = this.props.$super.hasSuperValueDeepChildren()
        // if (hasReactiveProps) {
        // }
        // do not render updates of component and its children if it is unmounted
        if (!this.mounted)
            return;
        await this.props.$super.execute(scopedComponent.scope, removeSimple(this.initialProps));
        // ask all the children
        for (const child of this.children) {
            await child.handlePropsChange(scopedComponent);
        }
        const newRender = this.renderSelf();
        if (newRender.params && !isSameDeep(this.lastRender?.params, newRender.params)) {
            this.app.$$render(RenderEvents.update, newRender);
            this.lastRender = newRender;
        }
    }
    async tick() {
        return new Promise((resolve, reject) => {
            // TODO: сделать настоящий тик
            setTimeout(resolve);
        });
    }
    makeId() {
        return makeUniqId(COMPONENT_ID_BYTES_NUM);
    }
    instantiateChildrenComponents() {
        let cmpDefinitions = [];
        let scopedComponent = this;
        if (this.componentDefinition.tmpl && this.componentDefinition.tmpl.length) {
            if (this.componentDefinition.childless) {
                throw new Error(`Component ${this.name} is childless and can't have tmpl`);
            }
            cmpDefinitions = this.componentDefinition.tmpl;
        }
        else if (!isEmptyObject(this.slotsDefinition)
            && !this.componentDefinition.childless) {
            // if this has slot definition and not childless then put Slot component
            // which will render the default slot
            // это старый способ - он сгенерирует лишний компонент Slot
            //cmpDefinitions = [{ component: 'Slot', tmplReplacement: true }]
            cmpDefinitions = this.slotsDefinition?.[SLOT_DEFAULT] || [];
            if (this.scopeComponent)
                scopedComponent = this.scopeComponent;
        }
        return cmpDefinitions
            .map((el) => instantiateChildComponent(el, this.app, this, scopedComponent));
    }
    /**
     * This is called on any change of props, state or children array
     * @private
     */
    handleAnyChange() {
        (async () => {
            // call onUpdate cb
            if (this.componentDefinition.onUpdate) {
                await this.runSprogCallback(this.componentDefinition.onUpdate);
            }
            this.events.emit(COMPONENT_EVENTS.update);
            // console.log(1111, this.state, this.props)
            //
            // // update current values
            // await this.props.$super.execute(this.scope, removeSimple(this.initialProps))
            //
            // console.log(2222, this.state, this.props)
            // ask all the children
            for (const child of this.children) {
                // changes have place in my that means I am is scoped component
                await child.handlePropsChange(this);
            }
        })()
            .catch(this.app.log.error);
    }
    renderChildren() {
        const res = this.children
            .map((child) => child.render());
        return (res.length) ? res : undefined;
    }
    async runSprogCallback(lines) {
        const superFunc = new SuperFunc(this.scope, {}, lines);
        await superFunc.exec();
    }
    stopListenIncomeEvents() {
        this.app.events.removeListener(this.incomeEventListenerIndex, this.app.makeIncomeEventName(this.id));
        delete this.incomeEventListenerIndex;
    }
}
