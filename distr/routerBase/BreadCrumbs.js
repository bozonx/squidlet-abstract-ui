import { IndexedEvents } from 'squidlet-lib';
export const BREADCRUMBS_DELIMITER = '/';
export default class BreadCrumbs {
    pathChangeEvent = new IndexedEvents();
    currentStepId = '0';
    steps = [];
    constructor() {
    }
    destroy() {
        // TODO: add
        // TODO: destroy states
    }
    getCurrentStepId() {
        return this.currentStepId;
    }
    getCurrentStep() {
        return this.steps[Number(this.currentStepId)];
    }
    getCurrentPath() {
        return this.getPathOfStepId(this.currentStepId);
    }
    getPathOfStepId(stepId) {
        // TODO: почему не используется stepId ???
        const names = this.steps.map((el) => el.name);
        // TODO: проверить
        const sliced = names.splice(0, Number(this.currentStepId) + 1);
        return sliced.join(BREADCRUMBS_DELIMITER);
    }
    getDirName() {
        // TODO: только до текущего stepId
        const names = this.steps.map((el) => el.name);
        if (names.length)
            names.pop();
        if (names.length) {
            return names.join(BREADCRUMBS_DELIMITER);
        }
        else {
            return BREADCRUMBS_DELIMITER;
        }
    }
    /**
     * Add step to current path
     * @param name
     * @param initialState
     * @param params
     */
    addStep(name, initialState = {}, params = {}) {
        const stepId = String(this.steps.length);
        this.steps.push({
            name,
            state: initialState,
            params,
        });
        this.currentStepId = stepId;
        this.pathChangeEvent.emit();
        return this.currentStepId;
    }
    toPath(newPath, params) {
        // TODO: если будет или не будет начальный слэш???
        const pathNames = newPath.split(BREADCRUMBS_DELIMITER);
        const newPathId = String(pathNames.length - 1);
        if (this.pathBaseOfCurrentPath(newPath)) {
            this.toStep(newPathId, params);
            return this.currentStepId;
        }
        // TODO: если это часть текущего пути то просто срезать путь
        this.steps = [];
        // TODO: что будет в случае рута???
        for (const name of pathNames) {
            this.steps.push({
                name,
                state: {},
                params,
            });
        }
        this.currentStepId = newPathId;
        this.pathChangeEvent.emit();
        return this.currentStepId;
    }
    toStep(stepId, params) {
        const newStepIdNum = Number(stepId);
        // if new step is greater or equal with current - do nothing
        if (newStepIdNum >= Number(this.currentStepId))
            return this.currentStepId;
        // TODO: обновить params
        this.currentStepId = stepId;
        // TODO: check
        // remove tail
        this.steps.splice(newStepIdNum);
    }
    back() {
        // TODO: do not remove bread crumbs just chanes id
    }
    forward() {
        // TODO: return to breadcrumb and it's saved state
    }
    pathBaseOfCurrentPath(newPath) {
        const currentPath = this.steps
            .map((el) => el.name)
            .join(BREADCRUMBS_DELIMITER);
        return currentPath.indexOf(newPath) >= 0;
    }
}
