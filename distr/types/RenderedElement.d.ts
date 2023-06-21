export interface RenderedElement {
    name: string;
    componentId: string;
    parentId: string;
    parentChildPosition: number;
    params?: Record<string, any>;
    children?: RenderedElement[];
}
