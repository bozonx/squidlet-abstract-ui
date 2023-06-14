export interface IncomeEvent {
  name: keyof typeof INCOME_EVENTS
  // you can modify this to prevent bubbling up the tree
  preventBubbling: boolean
  params: Record<string, any>
}


// TODO: указать тип defintion
export const INCOME_EVENTS_DEFINITIONS: Record<string, any> = {
  // click:
  sendText: {

  },
  sendPhoto: {

  },
  sendVideo: {

  },
  sendAudio: {

  },
  sendPoll: {

  },
  keyPressed: {

  },
  keyDown: {

  },
  // focus
  // blur
  mouseMove: {

  },
  // mouseEnter
  // mouseLeave
  // middleClick
  // rightClick
  // backClick
  swipe: {

  },
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
