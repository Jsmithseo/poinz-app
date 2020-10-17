"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * user set his email address
 */
const emailSetEventHandler = (room, eventPayload, userId) => {
  const modifiedUsers = { ...room.users,
    [userId]: { ...room.users[userId],
      email: eventPayload.email,
      emailHash: eventPayload.emailHash
    }
  };
  return { ...room,
    users: modifiedUsers
  };
};

var _default = emailSetEventHandler;
exports.default = _default;