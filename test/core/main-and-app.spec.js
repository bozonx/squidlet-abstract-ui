import {omitObj} from "squidlet-lib";
import {Main, RenderEvents, SYSTEM_EVENTS} from "../../src/index.js";
import {COMPONENT_EVENTS} from "../../src/Component.js";
import {APP_EVENTS} from "../../src/types/AppEvents.js";


describe(`main and app`, () => {
  it(`Init and destroy`, async () => {
    const main = new Main()
    const sysInitSpy = sinon.spy()
    const sysInitFinishSpy = sinon.spy()
    const sysDestroySpy = sinon.spy()
    const renderSpy = sinon.spy()
    const rootInitStartSpy = sinon.spy()
    const rootInitFinishSpy = sinon.spy()
    const rootInitMountSpy = sinon.spy()
    const rootInitDestroySpy = sinon.spy()
    const appDef = {
      tmpl: [
        {
          component: 'Div'
        }
      ]
    }

    main.setApp(appDef)

    main.systemEvents.addListener(SYSTEM_EVENTS.initStarted, sysInitSpy)
    main.systemEvents.addListener(SYSTEM_EVENTS.initStarted, sysInitFinishSpy)
    main.systemEvents.addListener(SYSTEM_EVENTS.destroyStarted, sysDestroySpy)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.root.events.addListener(COMPONENT_EVENTS.initStart, rootInitStartSpy)
      app.root.events.addListener(COMPONENT_EVENTS.initFinished, rootInitFinishSpy)
      app.root.events.addListener(COMPONENT_EVENTS.mounted, rootInitMountSpy)
      app.root.events.addListener(COMPONENT_EVENTS.destroy, rootInitDestroySpy)

      app.events.addListener(APP_EVENTS.render, (event, el) => {
        renderSpy(event, {
          //...omitObj(el, 'componentId'),
          ...el,
          children: el.children && [
            {
              ...omitObj(el.children[0], 'componentId')
            }
          ]
        })
      })
    })

    await main.init()

    sysInitSpy.should.have.been.calledOnce
    sysInitFinishSpy.should.have.been.calledOnce
    sysDestroySpy.should.have.not.been.called

    rootInitStartSpy.should.have.been.calledOnce
    rootInitFinishSpy.should.have.been.calledOnce
    rootInitMountSpy.should.have.been.calledOnce
    rootInitDestroySpy.should.have.not.been.called

    renderSpy.should.have.been.calledOnce
    renderSpy.should.have.been.calledWith(RenderEvents.mount, {
      name: 'Root',
      componentId: 'root',
      parentId: '',
      parentChildPosition: -1,
      children: [
        {
          name: 'Div',
          parentId: 'root',
          parentChildPosition: 0,
        }
      ]
    })

    await main.destroy()

    sysInitSpy.should.have.been.calledOnce
    sysInitFinishSpy.should.have.been.calledOnce
    sysDestroySpy.should.have.been.calledOnce

    renderSpy.should.have.been.calledTwice
    renderSpy.should.have.been.calledWith(RenderEvents.destroy, {
      name: 'Root',
      componentId: 'root',
      parentId: '',
      parentChildPosition: -1,
      children: undefined
    })

    rootInitStartSpy.should.have.been.calledOnce
    rootInitFinishSpy.should.have.been.calledOnce
    rootInitMountSpy.should.have.been.calledOnce
    rootInitDestroySpy.should.have.been.calledOnce

    assert.isTrue(main.app.root.props.$super.isDestroyed)
    assert.isTrue(main.app.root.state.$super.isDestroyed)
  })

})
