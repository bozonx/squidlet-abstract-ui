import { SuperItemInitDefinition } from 'squidlet-sprog';
import { Component } from '../Component.js';
export interface IncomeEvent {
    name: string;
    params: Record<string, any>;
    target?: Component;
}
export declare const DOM_EVENTS_DEFINITIONS: Record<string, Record<string, SuperItemInitDefinition>>;
export declare const DOM_EVENTS: {
    click: string;
    sendText: string;
    sendPhoto: string;
    sendVideo: string;
    sendAudio: string;
    sendPoll: string;
    keyPressed: string;
    keyDown: string;
    focus: string;
    blur: string;
    mouseMove: string;
    mouseEnter: string;
    mouseLeave: string;
    middleClick: string;
    rightClick: string;
    backClick: string;
    swipe: string;
};
