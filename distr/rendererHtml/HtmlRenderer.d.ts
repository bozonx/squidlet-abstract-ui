import { IncomeEvent } from '../types/IncomeEvent.js';
import { RenderedElement } from '../types/RenderedElement.js';
export declare class HtmlRenderer {
    constructor(appSelector: string);
    render(event: IncomeEvent, el: RenderedElement): void;
}
