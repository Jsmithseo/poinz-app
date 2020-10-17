"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcEmailHash = calcEmailHash;
exports.default = void 0;

var _crypto = require("crypto");

/**
 * A user sets his email address (used for Gravatar image fetching. See https://en.gravatar.com/ ).
 */
const schema = {
  allOf: [{
    $ref: 'command'
  }, {
    properties: {
      payload: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email'
          }
        },
        comment: 'do not set email as required. if not set or empty string (or falsy value) will reset email',
        required: [],
        additionalProperties: false
      }
    }
  }]
};
const setEmailCommandHandler = {
  schema,
  fn: (room, command) => {
    room.applyEvent('emailSet', { ...command.payload,
      emailHash: calcEmailHash(command.payload.email)
    });
  }
};
var _default = setEmailCommandHandler;
exports.default = _default;

function calcEmailHash(email) {
  return (0, _crypto.createHash)('md5').update(email).digest('hex');
}