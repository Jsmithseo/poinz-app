"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Adds user object with given userId to "users" list on room
 */
const joinedRoomEventHandler = (room, eventPayload, userId) => {
  const modifiedUsers = { ...room.users,
    [userId]: {
      id: userId
    }
  };
  return { ...room,
    users: modifiedUsers
  };
};

var _default = joinedRoomEventHandler;
exports.default = _default;