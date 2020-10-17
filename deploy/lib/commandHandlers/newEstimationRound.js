"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A user starts a new estimation round for a certain story.
 * This will clear all estimations given by users for this story.
 * This will reset any consensus that might have been achieved previously.
 *
 * Can only be done for the currently selected story.
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
const newEstimationRoundCommandHandler = {
  schema,
  preCondition: (room, command) => {
    if (room.selectedStory !== command.payload.storyId) {
      throw new Error('Can only start a new round for currently selected story!');
    }
  },
  fn: (room, command) => {
    room.applyEvent('newEstimationRoundStarted', command.payload);
  }
};
var _default = newEstimationRoundCommandHandler;
exports.default = _default;