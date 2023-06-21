import { RenderedElement } from '../types/RenderedElement.js';
import { RenderEvents } from '../types/RenderEvents.js';
export declare const COMPONENT_DATA_MARKER = "data-c-id";
export declare class HtmlRenderer {
    readonly rootSelector: string;
    constructor(appSelector: string);
    init(): void;
    render(event: RenderEvents, el: RenderedElement): void;
    private mountTree;
    private unmountTree;
    private destroyTree;
    private updateElement;
    private getElementByComponentId;
    private renderElement;
}
