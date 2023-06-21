export class HtmlRenderer {
    constructor(appSelector) {
        document.querySelector(appSelector).innerHTML = `
  <div>
    test
  </div>
`;
        // element.addEventListener('click', () => setCounter(counter + 1))
        //setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
    }
    render(event, el) {
    }
}
