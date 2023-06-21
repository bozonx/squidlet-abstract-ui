import { IndexedEvents } from 'squidlet-lib';
export declare const BREADCRUMBS_DELIMITER = "/";
export interface BreadCrumbsStep {
    name: string;
    state: Record<string, any>;
    params: Record<string, any>;
}
export default class BreadCrumbs {
    pathChangeEvent: IndexedEvents<() => void>;
    private currentStepId;
    private steps;
    constructor();
    destroy(): void;
    getCurrentStepId(): string;
    getCurrentStep(): BreadCrumbsStep;
    getCurrentPath(): string;
    getPathOfStepId(stepId: string): string;
    getDirName(): string;
    /**
     * Add step to current path
     * @param name
     * @param initialState
     * @param params
     */
    addStep(name: string, initialState?: Record<any, any>, params?: Record<any, any>): string;
    toPath(newPath: string, params: Record<string, any>): string;
    toStep(stepId: string, params: Record<string, any>): string | undefined;
    back(): void;
    forward(): void;
    private pathBaseOfCurrentPath;
}
