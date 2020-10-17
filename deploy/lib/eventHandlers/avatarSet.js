"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * user sets his avatar (number)
 */
const avatarSetEventHandler = (room, eventPayload, userId) => {
  const modifiedUsers = { ...room.users,
    [userId]: { ...room.users[userId],
      avatar: eventPayload.avatar
    }
  };
  return { ...room,
    users: modifiedUsers
  };
};

var _default = avatarSetEventHandler;
exports.default = _default;