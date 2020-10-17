"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * user set his name
 */
const usernameSetEventHandler = (room, eventPayload, userId) => {
  const modifiedUsers = { ...room.users,
    [userId]: { ...room.users[userId],
      username: eventPayload.username
    }
  };
  return { ...room,
    users: modifiedUsers
  };
};

var _default = usernameSetEventHandler;
exports.default = _default;