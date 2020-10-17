"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Resets "trashed" flag on matching story.
 * Flag will be "false" afterwards.
 */
const storyRestoredEventHandler = (room, eventPayload) => {
  const modifiedStories = { ...room.stories,
    [eventPayload.storyId]: { ...room.stories[eventPayload.storyId],
      trashed: false
    }
  };
  return { ...room,
    stories: modifiedStories
  };
};

var _default = storyRestoredEventHandler;
exports.default = _default;