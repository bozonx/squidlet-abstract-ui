import './style.css'
import {Main} from '../../src';


(async () => {
  const config = {}
  const main = new Main(config)


})()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    test
  </div>
`

// element.addEventListener('click', () => setCounter(counter + 1))
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
