import {Main, RenderEvents, SYSTEM_EVENTS} from "../../src/index.js";
import {APP_EVENTS} from "../../src/AppSingleton.js";
import {COMPONENT_EVENTS} from "../../src/Component.js";


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
              //value: 'str'
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

    await main.setApp(appDef)

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

    // TODO: должен быть рендер

    //renderSpy.should.have.been.calledTwice
    // renderSpy.should.have.been.calledWith(RenderEvents.mount, {
    //   name: 'Root',
    //   parentChildPosition: -1,
    //   children: [
    //     {
    //       name: 'MyCmp',
    //       parentChildPosition: 0,
    //       children: [
    //         {
    //           name: 'Text',
    //           parentChildPosition: 0,
    //           params: {
    //             value: '2'
    //           },
    //         }
    //       ]
    //     }
    //   ]
    // })

  })

})
