import {omitObj} from "squidlet-lib";
import {Main, SYSTEM_EVENTS} from "../../src/index.js";


describe(`app`, () => {
  it(`Init app`, async () => {

    const config = {}
    const main = new Main(config)
    const sysSpy = sinon.spy()
    const appSpy = sinon.spy()
    const app = {
      tmpl: [
        {
          component: 'Document'
        }
      ]
    }

    await main.setApp(app)

    main.systemEvents.addListener(sysSpy)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.outcomeEvents.addListener((event, el) => {
        appSpy(event, {
          ...el,
          children: [
            {
              ...omitObj(el.children[0], 'componentId')
            }
          ]
        })
      })
    })

    await main.init()

    appSpy.should.have.been.calledWith(0, {
      name: 'root',
      componentId: 'root',
      parentId: '',
      parentChildPosition: -1,
      children: [
        {
          name: 'Document',
          parentId: 'root',
          parentChildPosition: 0,
        }
      ]
    })

    // TODO: check system events
    // TODO: check component specific event
    // TODO: getComponentDefinition
  })

  it(`rise income event into App`, async () => {
    // TODO: call app.emitIncomeEvent
  })

})
