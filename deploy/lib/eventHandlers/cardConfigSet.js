"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * user did set custom cardConfig on room
 */
const cardConfigSetEventHandler = (room, eventPayload) => ({ ...room,
  cardConfig: eventPayload.cardConfig
});

var _default = cardConfigSetEventHandler;
exports.default = _default;