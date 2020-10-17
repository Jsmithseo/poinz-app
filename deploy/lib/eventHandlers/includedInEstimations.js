"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Sets "excluded" flag on user to false
 */
const includedInEstimationsEventHandler = (room, eventPayload, userId) => {
  const modifiedUsers = { ...room.users,
    [userId]: { ...room.users[userId],
      excluded: false
    }
  };
  return { ...room,
    users: modifiedUsers
  };
};

var _default = includedInEstimationsEventHandler;
exports.default = _default;