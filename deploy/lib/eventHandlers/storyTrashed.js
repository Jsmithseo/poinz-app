"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Marks matching story as "trashed".  Story stays in room.
 */
const storyTrashedEventHandler = (room, eventPayload) => {
  const modifiedStories = { ...room.stories,
    [eventPayload.storyId]: { ...room.stories[eventPayload.storyId],
      trashed: true
    }
  };
  return { ...room,
    stories: modifiedStories
  };
};

var _default = storyTrashedEventHandler;
exports.default = _default;