import {Main, RenderEvents, SYSTEM_EVENTS} from "../../src/index.js";
import {COMPONENT_EVENTS} from "../../src/Component.js";
import {APP_EVENTS} from "../../src/types/AppEvents.js";


describe(`component props`, () => {
  it(`common`, async () => {
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
          prop1: {
            $exp: 'getValue',
            path: 'state.v1',
          }
        }
      ]
    }

    main.setApp(appDef)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.events.addListener(APP_EVENTS.initFinished, () => {
        assert.equal(app.root.children[0].props.prop1, '1')
        assert.equal(app.root.state.v1, '1')
      })

      app.root.events.addListener(COMPONENT_EVENTS.initFinished, () => {
        assert.equal(app.root.children[0].props.prop1, '0')
      })

      app.root.events.addListener(COMPONENT_EVENTS.mounted, () => {
        assert.equal(app.root.children[0].props.prop1, '1')
      })

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
                value: '1'
              },
            }
          ]
        }
      ]
    })

    // change state. it will lead to change prop
    main.app.root.state['v1'] = '2'

    await main.app.root.tick()

    assert.equal(main.app.root.children[0].props.prop1, '2')
    assert.equal(main.app.root.children[0].children[0].props.value, '2')

    renderSpy.should.have.been.calledTwice
    renderSpy.should.have.been.calledWith(RenderEvents.update, {
      name: 'Text',
      parentChildPosition: 0,
      params: {
        value: '2'
      },
    })

  })

})
