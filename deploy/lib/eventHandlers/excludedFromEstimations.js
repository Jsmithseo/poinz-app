"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Sets "excluded" flag on user to true
 */
const excludedFromEstimationsEventHandler = (room, eventPayload, userId) => {
  const modifiedUsers = { ...room.users,
    [userId]: { ...room.users[userId],
      excluded: true
    }
  };
  return { ...room,
    users: modifiedUsers
  };
};

var _default = excludedFromEstimationsEventHandler;
exports.default = _default;