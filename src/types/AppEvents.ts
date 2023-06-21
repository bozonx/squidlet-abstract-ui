export enum APP_EVENTS {
  initStarted,
  initFinished,
  // destroy started
  destroy,
  // outcome event which has to be handled by external renderer
  render,
  // ordinary income event
  income,
}
