export enum RenderEvents {
  // mount UI element and it's children
  mount,
  // unmount UI element and it's children
  unMount,
  // update only UI element params or children add/remove/move
  update,
  // renderer has to totally destroy component and umount it to
  destroy,
}

export const INCOME_EVENTS = {
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
}
