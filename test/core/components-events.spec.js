import {Main, RenderEvents, SYSTEM_EVENTS} from "../../src/index.js";
import {APP_EVENTS} from "../../src/AppSingleton.js";


// TODO: test handler with params


describe(`component events`, () => {
  it(`income from frontend`, async () => {
    const main = new Main()
    const renderSpy = sinon.spy()
    const appDef = {
      components: [
        {
          name: 'MyCmp',
          handlers: {
            click: {
              lines: [
                {
                  $exp: 'setValue',
                  path: 'state.val',
                  value: 'clicked',
                }
              ]
            }
          },
          state: {
            val: {
              type: 'string',
              default: 'inited',
            }
          },
          tmpl: [
            {
              component: 'Text',
              value: {
                $exp: 'getValue',
                path: 'state.val',
              }
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
      // app.events.addListener(APP_EVENTS.initFinished, () => {
      //
      // })

      app.events.addListener(APP_EVENTS.render, (event, el) => {
        renderSpy(event, clearRenderElement(el))
      })
    })

    await main.init()

    main.app.emitIncomeEvent('click', main.app.root.children[0].id)

    await main.app.root.tick()

    assert.equal(main.app.root.children[0].state.val, 'clicked')

    renderSpy.should.have.been.calledTwice
    renderSpy.should.have.been.calledWith(RenderEvents.update, {
      name: 'Text',
      parentChildPosition: 0,
      params: {
        value: 'clicked'
      },
    })
  })

  it.only(`custom event`, async () => {

  })

})

