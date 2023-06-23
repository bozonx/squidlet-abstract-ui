import {Main, RenderEvents, SYSTEM_EVENTS} from "../../src/index.js"
import {APP_EVENTS} from "../../src/types/AppEvents.js";


describe(`component slots`, () => {
  it(`default slot`, async () => {
    const main = new Main()
    const renderSpy = sinon.spy()
    const appDef = {
      tmpl: [
        {
          component: 'Div',
          slot: [
            {
              component: 'Text',
              value: 'Hello'
            }
          ]
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

    renderSpy.should.have.been.calledOnce
    renderSpy.should.have.been.calledWith(RenderEvents.mount, {
      name: 'Root',
      parentChildPosition: -1,
      children: [
        {
          name: 'Div',
          parentChildPosition: 0,
          children: [
            {
              name: 'Slot',
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
        }
      ]
    })
  })

  it.only(`named slot`, async () => {
    const main = new Main()
    const renderSpy = sinon.spy()
    const appDef = {
      components: [
        {
          name: 'MyCmp',
          tmpl: [
            {
              component: 'Div',
              slot: [
                {
                  component: 'Slot',
                  name: 'some'
                }
              ]
            }
          ],
        }
      ],
      tmpl: [
        {
          component: 'MyCmp',
          slot: {
            some: [
              {
                component: 'Text',
                value: 'Hello',
              }
            ]
          }
        }
      ]
    }

    main.setApp(appDef)

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.events.addListener(APP_EVENTS.render, (event, el) => {

        console.log(333, JSON.stringify(el, null, 2));

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
              name: 'Div',
              parentChildPosition: 0,
              children: [
                {
                  name: 'Slot',
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
            }
          ],
        },
      ]
    })
  })

})

// TODO: test named slots of custom components
// TODO: test slots with params

