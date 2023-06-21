import { Main } from './Main.js';
import { AbstractUiPackage } from './types/types.js';
export declare class PackageManager {
    private readonly main;
    private readonly context;
    constructor(main: Main);
    use(pkg: AbstractUiPackage): void;
}
