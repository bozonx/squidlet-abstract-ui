import {omitObj} from 'squidlet-lib'
import {Main, SYSTEM_EVENTS} from "../../src/index.js";
import {ROOT_COMPONENT_ID} from "../../src/RootComponent.js";


const rootCmp = `
name: root
tmpl:
  - component: Document
`

describe('Full test', () => {
  it('initialize', async () => {
    const config = {}
    const main = new Main(config)
    const cb = sinon.spy()

    main.componentsManager.registerComponents({
      [ROOT_COMPONENT_ID]: rootCmp
    })

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.outcomeEvents.addListener((event, el) => {
        cb(event, {
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

    cb.should.have.been.calledWith(0, {
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

  })
})
