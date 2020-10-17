"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultCardConfig = _interopRequireDefault(require("../defaultCardConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A room was created. Creates a new default room object
 * @param room
 */
const roomCreatedEventHandler = room => ({
  id: room.id,
  users: {},
  stories: {},
  cardConfig: _defaultCardConfig.default,
  created: Date.now()
});

var _default = roomCreatedEventHandler;
exports.default = _default;