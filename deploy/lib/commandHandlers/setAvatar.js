"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A user sets his avatar. Identified with a number, starting with 0.
 * Only the client (App) knows which and how many avatars exist and also which number maps to which avatar.
 * Currently 0 is the "anonymous" avatar and used by default.
 */
const schema = {
  allOf: [{
    $ref: 'command'
  }, {
    properties: {
      payload: {
        type: 'object',
        properties: {
          avatar: {
            type: 'number'
          }
        },
        required: ['avatar'],
        additionalProperties: false
      }
    }
  }]
};
const setAvatarCommandHandler = {
  schema,
  fn: (room, command) => {
    room.applyEvent('avatarSet', command.payload);
  }
};
var _default = setAvatarCommandHandler;
exports.default = _default;