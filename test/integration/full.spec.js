import {Main} from "../../src/index.js";
import {ROOT_COMPONENT_ID} from "../../src/RootComponent.js";


const rootCmp = `
name: root
tmpl:
  - component: Document
`

describe('Full test', () => {
  it('initialize', () => {
    const config = {}
    const main = new Main(config)

    main.componentsManager.registerComponents({
      [ROOT_COMPONENT_ID]: rootCmp
    })
  })
})
