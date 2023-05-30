import './style.css'
import {Main} from '../../src';
import {ROOT_COMPONENT_ID} from '../../src/RootComponent.ts';
import {Root} from './components/Root.ts';


(async () => {
  const config = {}
  const main = new Main(config)

  main.componentsManager.registerComponents({
    [ROOT_COMPONENT_ID]: Root
  })

})()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    test
  </div>
`

// element.addEventListener('click', () => setCounter(counter + 1))
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
