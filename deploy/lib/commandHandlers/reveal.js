"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonPreconditions = require("./commonPreconditions");

/**
 * A user manually reveals estimates for a certain story
 * Users may only reveal the currently selected story
 * If story is already revealed, reject command.
 *
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
            minLength: 1
          }
        },
        required: ['storyId'],
        additionalProperties: false
      }
    }
  }]
};
const revealCommandHandler = {
  schema,
  preCondition: (room, command) => {
    if (room.selectedStory !== command.payload.storyId) {
      throw new Error('Can only reveal currently selected story!');
    }

    (0, _commonPreconditions.throwIfStoryIdNotFoundInRoom)(room, command.payload.storyId);

    if (room.stories[command.payload.storyId].revealed) {
      throw new Error('Story is already revealed');
    }
  },
  fn: (room, command) => {
    room.applyEvent('revealed', {
      storyId: command.payload.storyId,
      manually: true
    });
  }
};
var _default = revealCommandHandler;
exports.default = _default;