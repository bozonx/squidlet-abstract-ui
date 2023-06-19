import {SuperItemInitDefinition} from 'squidlet-sprog'
import {Component} from '../Component.js';


export interface IncomeEvent {
  name: string
  // you can modify this to prevent bubbling up the tree
  //preventBubbling?: boolean
  params: Record<string, any>
  // if custom component then target has to be set
  target?: Component,
}


export const DOM_EVENTS_DEFINITIONS: Record<string, Record<string, SuperItemInitDefinition>> = {
  // click:
  sendText: {
    text: {
      type: 'string',
      nullable: false,
    }
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
}
