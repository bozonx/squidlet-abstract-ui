import {Main} from "../../src/index.js";


describe(`router`, () => {
  it(`common`, async () => {
    const main = new Main()
    const appDef = {
      routes: [
        {

        }
      ],
      tmpl: [
        {
          component: 'Div'
        }
      ]
    }

    await main.setApp(appDef)

  })

  it(`get screens from app config`, async () => {

  })

})
