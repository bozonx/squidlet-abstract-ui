import {IncomeEvent} from '../types/IncomeEvent.js';
import {RenderedElement} from '../types/RenderedElement.js';


export class HtmlRenderer {


  constructor(appSelector: string) {

    document.querySelector<HTMLDivElement>(appSelector)!.innerHTML = `
  <div>
    test
  </div>
`

// element.addEventListener('click', () => setCounter(counter + 1))
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

  }


  render(event: IncomeEvent, el: RenderedElement) {

  }

}
