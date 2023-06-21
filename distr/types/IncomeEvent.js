export const DOM_EVENTS_DEFINITIONS = {
    // click:
    sendText: {
        text: {
            type: 'string',
            nullable: false,
        }
    },
    sendPhoto: {},
    sendVideo: {},
    sendAudio: {},
    sendPoll: {},
    keyPressed: {},
    keyDown: {},
    // focus
    // blur
    mouseMove: {},
    // mouseEnter
    // mouseLeave
    // middleClick
    // rightClick
    // backClick
    swipe: {},
};
export const DOM_EVENTS = {
    click: 'click',
    // messenger events
    sendText: 'sendText',
    sendPhoto: 'sendPhoto',
    sendVideo: 'sendVideo',
    sendAudio: 'sendAudio',
    sendPoll: 'sendPoll',
    // full-functional UI events
    keyPressed: 'keyPressed',
    keyDown: 'keyDown',
    focus: 'focus',
    blur: 'blur',
    mouseMove: 'mouseMove',
    mouseEnter: 'mouseEnter',
    mouseLeave: 'mouseLeave',
    middleClick: 'middleClick',
    rightClick: 'rightClick',
    backClick: 'backClick',
    swipe: 'swipe',
};
