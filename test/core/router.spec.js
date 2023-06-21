import {Main} from "../../src/index.js"


describe(`router`, () => {
  it(`common`, async () => {
    const main = new Main()
    const appDef = {
      routes: [
        {
          path: '/',
          screen: {
            name: 'HomeScreen',
            tmpl: [
              {
                component: 'Text',
                text: 'home page',
              }
            ],
          },
        },
        {
          path: '/page1',
          screen: {
            name: 'Page1Screen',
            tmpl: [
              {
                component: 'Text',
                text: 'page 1',
              }
            ],
          },
        },
      ],
      tmpl: [
        {
          component: 'Div',
          slot: [
            {
              component: 'Router',
            }
          ]
        }
      ]
    }

    main.setApp(appDef)
    await main.init()

  })

  it(`get screens from app config`, async () => {

  })


  // TODO: test - route params
  // TODO: test - nested routes
  // TODO: test - get route from props or scope ??
  // TODO: test - layout of routes
  // TODO: test - сразу установлен изначальный роут

})
