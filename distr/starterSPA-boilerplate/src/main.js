import './style.css';
import { Main } from '../../src';
(async () => {
    const config = {};
    const main = new Main(config);
    // main.componentsManager.registerComponents({
    //   [ROOT_COMPONENT_ID]: Root
    // })
})();
document.querySelector('#app').innerHTML = `
  <div>
    test
  </div>
`;
// element.addEventListener('click', () => setCounter(counter + 1))
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
