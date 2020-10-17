"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * removes user from "users" list
 * removes estimations on all stories that were given by user
 */
const leftRoomEventHandler = (room, eventPayload, userId) => {
  // Do not remove estimations. "moderator" might want to export stories and estimations after participants left the room.
  // this means, we keep part of the "history".. on export we will not be able to export the username, we are left with the userId...
  // remove user from room
  const modifiedUsers = { ...room.users
  };
  delete modifiedUsers[userId];
  return { ...room,
    users: modifiedUsers
  };
};

var _default = leftRoomEventHandler;
exports.default = _default;