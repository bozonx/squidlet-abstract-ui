export var APP_EVENTS;
(function (APP_EVENTS) {
    APP_EVENTS[APP_EVENTS["initStarted"] = 0] = "initStarted";
    APP_EVENTS[APP_EVENTS["initFinished"] = 1] = "initFinished";
    // destroy started
    APP_EVENTS[APP_EVENTS["destroy"] = 2] = "destroy";
    // outcome event which has to be handled by external renderer
    APP_EVENTS[APP_EVENTS["render"] = 3] = "render";
    // ordinary income event
    APP_EVENTS[APP_EVENTS["income"] = 4] = "income";
})(APP_EVENTS = APP_EVENTS || (APP_EVENTS = {}));
