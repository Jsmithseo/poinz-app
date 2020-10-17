"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonPreconditions = require("./commonPreconditions");

/**
 * A user "trashes" a story  (marked as trashed, still in room).
 *
 * If the story that is "trashed" is the selectedStory in the room, an additional "storySelected" event is produced
 */
const schema = {
  allOf: [{
    $ref: 'command'
  }, {
    properties: {
      payload: {
        type: 'object',
        properties: {
          storyId: {
            type: 'string',
            format: 'uuidv4'
          }
        },
        required: ['storyId'],
        additionalProperties: false
      }
    }
  }]
};
const trashStoryCommandHandler = {
  schema,
  preCondition: (room, command) => {
    (0, _commonPreconditions.throwIfStoryIdNotFoundInRoom)(room, command.payload.storyId);
  },
  fn: (room, command) => {
    room.applyEvent('storyTrashed', command.payload);

    if (room.selectedStory === command.payload.storyId) {
      room.applyEvent('storySelected', {
        storyId: findNextStoryToSelect(room, command)
      });
    }
  }
};
var _default = trashStoryCommandHandler;
exports.default = _default;

function findNextStoryToSelect(room, trashCommand) {
  const remainingStories = Object.values(room.stories || {}).filter(story => !story.trashed && story.id !== trashCommand.payload.storyId);

  if (remainingStories.length > 0) {
    return remainingStories[0].id;
  }

  return undefined;
}