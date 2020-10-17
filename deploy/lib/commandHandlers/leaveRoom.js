"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A user wants to leave the room.
 * Is also produced by the socketServer itself on connection lost!
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
          connectionLost: {
            type: 'boolean'
          }
        },
        required: [],
        additionalProperties: false
      }
    }
  }]
};
const leaveRoomCommandHandler = {
  schema,
  fn: (room, command) => {
    if (command.payload.connectionLost) {
      room.applyEvent('connectionLost', {});
    } else {
      room.applyEvent('leftRoom', {});
    }
  }
};
var _default = leaveRoomCommandHandler;
exports.default = _default;