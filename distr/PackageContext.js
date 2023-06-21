export class PackageContext {
    main;
    get systemEvents() {
        return this.main.systemEvents;
    }
    constructor(main) {
        this.main = main;
    }
    setRouter() {
        this.main.registerRouter();
    }
    setLogger(logger) {
        this.main.setLogger(logger);
    }
    registerComponents(components) {
        this.main.componentsManager.registerComponents(components);
    }
}
