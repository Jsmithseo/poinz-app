"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Removes a previously set estimation value on the given story for the given user
 */
const storyEstimateClearedEventHandler = (room, eventPayload, userId) => {
  const modifiedEstimations = { ...room.stories[eventPayload.storyId].estimations,
    [userId]: eventPayload.value
  };
  delete modifiedEstimations[userId];
  const modifiedStories = { ...room.stories,
    [eventPayload.storyId]: { ...room.stories[eventPayload.storyId],
      estimations: modifiedEstimations
    }
  };
  return { ...room,
    stories: modifiedStories
  };
};

var _default = storyEstimateClearedEventHandler;
exports.default = _default;