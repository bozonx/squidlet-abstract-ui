export class AppContext {
    app;
    get router() {
        return this.app.router;
    }
    get events() {
        return this.app.events;
    }
    get log() {
        return this.app.log;
    }
    get root() {
        return this.app.root;
    }
    get storage() {
        return this.app.storage;
    }
    constructor(app) {
        this.app = app;
    }
}
