"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonPreconditions = require("./commonPreconditions");

/**
 * A user removes a disconnected user from the room.
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
          userId: {
            type: 'string',
            format: 'uuidv4'
          }
        },
        required: ['userId'],
        additionalProperties: false
      }
    }
  }]
};
const kickCommandHandler = {
  schema,
  preCondition: (room, command, userId) => {
    if (userId === command.payload.userId) {
      throw new Error('User cannot kick himself!');
    }

    (0, _commonPreconditions.throwIfUserIdNotFoundInRoom)(room, command.payload.userId);
  },
  fn: (room, command) => {
    room.applyEvent('kicked', {
      userId: command.payload.userId
    });
  }
};
var _default = kickCommandHandler;
exports.default = _default;