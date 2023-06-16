import {Main, RenderEvents, SYSTEM_EVENTS} from "../../src/index.js";
import {APP_EVENTS} from "../../src/AppSingleton.js";


describe(`custom component`, () => {
  it(`common`, async () => {
    const main = new Main()
    const renderSpy = sinon.spy()
    const appDef = {
      components: [
        {
          name: 'MyCmp',
          tmpl: [
            {
              component: 'Text',
              value: 'Hello'
            }
          ],
        }
      ],
      tmpl: [
        {
          component: 'MyCmp',
        }
      ]
    }

    await main.setApp(appDef)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.events.addListener(APP_EVENTS.render, (event, el) => {
        renderSpy(event, clearRenderElement(el))
      })
    })

    await main.init()

    renderSpy.should.have.been.calledOnce
    renderSpy.should.have.been.calledWith(RenderEvents.mount, {
      name: 'Root',
      parentChildPosition: -1,
      children: [
        {
          name: 'MyCmp',
          parentChildPosition: 0,
          children: [
            {
              name: 'Text',
              parentChildPosition: 0,
              params: {
                value: 'Hello'
              },
            }
          ]
        }
      ]
    })
  })
})
