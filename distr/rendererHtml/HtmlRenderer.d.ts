import { RenderedElement } from '../types/RenderedElement.js';
import { RenderEvents } from '../types/RenderEvents.js';
export declare class HtmlRenderer {
    readonly appSelector: string;
    constructor(appSelector: string);
    init(): void;
    render(event: RenderEvents, el: RenderedElement): void;
    private mountTree;
    private unmountTree;
    private destroyTree;
    private updateElement;
}
