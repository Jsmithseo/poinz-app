"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Title and/or Description of story changed
 */
const storyChangedEventHandler = (room, eventPayload) => {
  // for now, the changeStory command must contain always both attributes (see validation schema)
  // so we can just overwrite both
  const modifiedStories = { ...room.stories,
    [eventPayload.storyId]: { ...room.stories[eventPayload.storyId],
      title: eventPayload.title,
      description: eventPayload.description
    }
  };
  return { ...room,
    stories: modifiedStories
  };
};

var _default = storyChangedEventHandler;
exports.default = _default;