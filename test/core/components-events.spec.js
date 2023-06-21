import {Main, RenderEvents, SYSTEM_EVENTS} from "../../src/index.js";
import {APP_EVENTS} from "../../src/types/AppEvents.js";


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

    main.setApp(appDef)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
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

  it(`custom event`, async () => {
    const main = new Main()
    const renderSpy = sinon.spy()
    const appDef = {
      components: [
        {
          name: 'MyCmp',
        }
      ],
      state: {
        val: {
          type: 'string',
          default: 'inited',
        }
      },
      handlers: {
        custom: {
          params: {
            p1: {
              type: 'string',
            }
          },
          lines: [
            {
              $exp: 'setValue',
              path: 'state.val',
              //value: 'fromCustomEmit'
              value: {
                $exp: 'getValue',
                path:'params.event.params.p1',
              },
            }
          ]
        }
      },
      tmpl: [
        {
          component: 'MyCmp',
        },
        {
          component: 'Text',
          value: {
            $exp: 'getValue',
            path: 'state.val',
          }
        }
      ]
    }

    main.setApp(appDef)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.events.addListener(APP_EVENTS.render, (event, el) => {
        renderSpy(event, clearRenderElement(el))
      })
    })

    await main.init()

    main.app.root.children[0].emit('custom', {p1: 'fromCustomEmit'})

    await main.app.root.tick()

    assert.equal(main.app.root.state.val, 'fromCustomEmit')

    renderSpy.should.have.been.calledTwice
    renderSpy.should.have.been.calledWith(RenderEvents.update, {
      name: 'Text',
      parentChildPosition: 1,
      params: {
        value: 'fromCustomEmit'
      },
    })
  })

})
