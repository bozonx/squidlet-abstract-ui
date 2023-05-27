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

    main.componentsManager.registerComponents({
      [ROOT_COMPONENT_ID]: rootCmp
    })

    main.systemEvents.once(SYSTEM_EVENTS.newApp, (app) => {
      app.outcomeEvents.addListener((event, el) => {
        console.log(1111, event, el)
      })
    })

    await main.init()
  })
})
