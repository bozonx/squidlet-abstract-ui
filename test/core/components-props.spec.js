import {Main, SYSTEM_EVENTS} from "../../src/index.js";
import {APP_EVENTS} from "../../src/AppSingleton.js";


describe(`component props`, () => {
  it.only(`common`, async () => {
    const main = new Main()
    const renderSpy = sinon.spy()
    const appDef = {
      components: [
        {
          name: 'MyCmp',
          props: {
            prop1: {
              type: 'string',
              default: '0',
            }
          },
          tmpl: [
            {
              component: 'Text',
              value: {
                $exp: 'getValue',
                path: 'props.prop1',
              }
            }
          ],
        }
      ],
      state: {
        v1: {
          type: 'string',
          default: '1',
        }
      },
      tmpl: [
        {
          component: 'MyCmp',
          props: {
            prop1: {
              $exp: 'getValue',
              path: 'state.v1',
            }
          }
        }
      ]
    }

    await main.setApp(appDef)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.events.addListener(APP_EVENTS.initFinished, () => {
        assert.equal(app.root.children[0].props.prop1, '0')
        assert.equal(app.root.state.v1, '1')
      })

      app.events.addListener(APP_EVENTS.render, (event, el) => {
        renderSpy(event, clearRenderElement(el))
      })
    })

    await main.init()

    renderSpy.should.have.been.calledOnce
  })
})
