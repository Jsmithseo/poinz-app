"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Store id of given story as "selectedStory"
 */
const storySelectedEventHandler = (room, eventPayload) => ({ ...room,
  selectedStory: eventPayload.storyId
});

var _default = storySelectedEventHandler;
exports.default = _default;