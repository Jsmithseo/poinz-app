"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Marks user as "disconnected".
 */
const connectionLostEventHandler = (room, eventPayload, userId) => {
  const matchingUser = room.users && room.users[userId];

  if (!matchingUser) {
    return { ...room
    };
  }

  const modifiedUsers = { ...room.users,
    [userId]: { ...matchingUser,
      disconnected: true
    }
  };
  return { ...room,
    users: modifiedUsers
  };
};

var _default = connectionLostEventHandler;
exports.default = _default;