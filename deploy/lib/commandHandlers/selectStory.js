"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonPreconditions = require("./commonPreconditions");

/**
 * A user selected a story (marked it as the "current" story to estimate)
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
const selectStoryCommandHandler = {
  schema,
  preCondition: (room, command) => {
    (0, _commonPreconditions.throwIfStoryIdNotFoundInRoom)(room, command.payload.storyId);
    (0, _commonPreconditions.throwIfStoryTrashed)(room, command.payload.storyId);
  },
  fn: (room, command) => {
    room.applyEvent('storySelected', {
      storyId: command.payload.storyId
    });
  }
};
var _default = selectStoryCommandHandler;
exports.default = _default;