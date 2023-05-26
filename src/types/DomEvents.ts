export enum OutcomeEvents {
  // mount UI element and it's children
  mount,
  // unmount UI element and it's children
  unMount,
  // update only UI element params or children add/remove/move
  update,
}

export enum IncomeEvents {
  click,
  // messenger events
  sendText,
  sendPhoto,
  sendVideo,
  sendAudio,
  sendPoll,
  // full-functional UI events
  keyPressed,
  keyDown,
  focus,
  blur,
  mouseMove,
  mouseEnter,
  mouseLeave,
  middleClick,
  rightClick,
  backClick,
  swipe,
}
