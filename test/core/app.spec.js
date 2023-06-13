import {omitObj} from "squidlet-lib";
import {Main, SYSTEM_EVENTS} from "../../src/index.js";
import {COMPONENT_EVENTS} from "../../src/Component.js";


describe(`app`, () => {
  it(`Init app`, async () => {

    const config = {}
    const main = new Main(config)
    const sysInitSpy = sinon.spy()
    const sysInitFinishSpy = sinon.spy()
    const sysDestroySpy = sinon.spy()
    const appSpy = sinon.spy()
    const rootInitStartSpy = sinon.spy()
    const rootInitFinishSpy = sinon.spy()
    const rootInitMountSpy = sinon.spy()
    const rootInitUnmountSpy = sinon.spy()
    const rootInitDestroySpy = sinon.spy()
    const appDef = {
      tmpl: [
        {
          component: 'Div'
        }
      ]
    }

    await main.setApp(appDef)

    main.systemEvents.addListener(SYSTEM_EVENTS.initStarted, sysInitSpy)
    main.systemEvents.addListener(SYSTEM_EVENTS.initStarted, sysInitFinishSpy)
    main.systemEvents.addListener(SYSTEM_EVENTS.destroyStarted, sysDestroySpy)
    main.app.root.events.addListener(COMPONENT_EVENTS.initStart, rootInitStartSpy)
    main.app.root.events.addListener(COMPONENT_EVENTS.initFinished, rootInitFinishSpy)
    main.app.root.events.addListener(COMPONENT_EVENTS.mounted, rootInitMountSpy)
    main.app.root.events.addListener(COMPONENT_EVENTS.unmounted, rootInitUnmountSpy)
    main.app.root.events.addListener(COMPONENT_EVENTS.destroy, rootInitDestroySpy)

    // main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
    //   app.outcomeEvents.addListener((event, el) => {
    //     appSpy(event, {
    //       ...el,
    //       children: [
    //         {
    //           ...omitObj(el.children[0], 'componentId')
    //         }
    //       ]
    //     })
    //   })
    // })

    await main.init()

    sysInitSpy.should.have.been.calledOnce
    sysInitFinishSpy.should.have.been.calledOnce
    sysDestroySpy.should.have.not.been.called

    rootInitStartSpy.should.have.been.calledOnce
    rootInitFinishSpy.should.have.been.calledOnce
    rootInitMountSpy.should.have.been.calledOnce
    rootInitUnmountSpy.should.have.not.been.called
    rootInitDestroySpy.should.have.not.been.called

    // sysSpy.should.have.been.calledWith(SYSTEM_EVENTS.newApp)

    // appSpy.should.have.been.calledWith(0, {
    //   name: 'root',
    //   componentId: 'root',
    //   parentId: '',
    //   parentChildPosition: -1,
    //   children: [
    //     {
    //       name: 'Document',
    //       parentId: 'root',
    //       parentChildPosition: 0,
    //     }
    //   ]
    // })

    await main.destroy()

    sysInitSpy.should.have.been.calledOnce
    sysInitFinishSpy.should.have.been.calledOnce
    sysDestroySpy.should.have.been.calledOnce

    assert.isTrue(main.app.root.props.$super.isDestroyed)
    assert.isTrue(main.app.root.state.$super.isDestroyed)

    // TODO: check component specific event
    // TODO: getComponentDefinition
  })

  it(`rise income event into App`, async () => {
    // TODO: call app.emitIncomeEvent
  })

})
