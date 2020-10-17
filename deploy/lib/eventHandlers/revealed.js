"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Estimations for the given story were revealed.
 * This happens automatically if all users that can estimate (not marked as excluded, not disconnected) did estimate the current story (i.e. if the last user gives his estimate)
 * This happens if a user manually reveals. (this is helpful, if someone is AFK and team wants to proceed with the estimation meeting)
 */
const revealedEventHandler = (room, eventPayload) => {
  const modifiedStories = { ...room.stories,
    [eventPayload.storyId]: { ...room.stories[eventPayload.storyId],
      revealed: true
    }
  };
  return { ...room,
    stories: modifiedStories
  };
};

var _default = revealedEventHandler;
exports.default = _default;