"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonPreconditions = require("./commonPreconditions");

/**
 * A user changes the title and/or description of a story
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
            type: 'string'
          },
          title: {
            type: 'string',
            minLength: 1,
            maxLength: 100
          },
          description: {
            type: 'string',
            minLength: 0,
            maxLength: 2000
          }
        },
        required: ['title', 'description', 'storyId'],
        additionalProperties: false
      }
    }
  }]
};
const changeStoryCommandHandler = {
  schema,
  preCondition: (room, command) => {
    (0, _commonPreconditions.throwIfStoryIdNotFoundInRoom)(room, command.payload.storyId);
    (0, _commonPreconditions.throwIfStoryTrashed)(room, command.payload.storyId);
  },
  fn: (room, command) => {
    room.applyEvent('storyChanged', command.payload);
  }
};
var _default = changeStoryCommandHandler;
exports.default = _default;