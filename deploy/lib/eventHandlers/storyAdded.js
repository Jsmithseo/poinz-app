"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * a new story was added to the room
 */
const storyAddedEventHandler = (room, eventPayload) => {
  const newStory = { ...eventPayload,
    estimations: {}
  };
  const modifiedStories = { ...room.stories,
    [eventPayload.id]: newStory
  };
  return { ...room,
    stories: modifiedStories
  };
};

var _default = storyAddedEventHandler;
exports.default = _default;