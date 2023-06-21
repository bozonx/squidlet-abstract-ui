import { PackageContext } from './PackageContext.js';
export class PackageManager {
    main;
    context;
    constructor(main) {
        this.main = main;
        this.context = new PackageContext(this.main);
    }
    use(pkg) {
        pkg(this.context);
    }
}
