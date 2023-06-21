import { Logger, IndexedEventEmitter } from 'squidlet-lib';
import { Main } from './Main.js';
import { ComponentDefinition } from './types/ComponentDefinition.js';
export declare class PackageContext {
    private readonly main;
    get systemEvents(): IndexedEventEmitter;
    constructor(main: Main);
    setRouter(): void;
    setLogger(logger: Logger): void;
    registerComponents(components: (string | ComponentDefinition)[]): void;
}
