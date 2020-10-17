"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Removes matching story from "stories" list in room
 */
const storyDeletedEventHandler = (room, eventPayload) => {
  const modifiedStories = { ...room.stories
  };
  delete modifiedStories[eventPayload.storyId];
  return { ...room,
    stories: modifiedStories
  };
};

var _default = storyDeletedEventHandler;
exports.default = _default;