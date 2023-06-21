export var RenderEvents;
(function (RenderEvents) {
    // mount UI element and it's children
    RenderEvents[RenderEvents["mount"] = 0] = "mount";
    // unmount UI element and it's children
    RenderEvents[RenderEvents["unMount"] = 1] = "unMount";
    // update only UI element params or children add/remove/move
    RenderEvents[RenderEvents["update"] = 2] = "update";
    // renderer has to totally destroy component and umount it to
    RenderEvents[RenderEvents["destroy"] = 3] = "destroy";
})(RenderEvents = RenderEvents || (RenderEvents = {}));
