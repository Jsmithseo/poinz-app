"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseCommandSchema = exports.default = void 0;

var _addStory = _interopRequireDefault(require("./addStory"));

var _changeStory = _interopRequireDefault(require("./changeStory"));

var _deleteStory = _interopRequireDefault(require("./deleteStory"));

var _trashStory = _interopRequireDefault(require("./trashStory"));

var _restoreStory = _interopRequireDefault(require("./restoreStory"));

var _importStories = _interopRequireDefault(require("./importStories"));

var _clearStoryEstimate = _interopRequireDefault(require("./clearStoryEstimate"));

var _giveStoryEstimate = _interopRequireDefault(require("./giveStoryEstimate"));

var _joinRoom = _interopRequireDefault(require("./joinRoom"));

var _kick = _interopRequireDefault(require("./kick"));

var _leaveRoom = _interopRequireDefault(require("./leaveRoom"));

var _newEstimationRound = _interopRequireDefault(require("./newEstimationRound"));

var _reveal = _interopRequireDefault(require("./reveal"));

var _selectStory = _interopRequireDefault(require("./selectStory"));

var _setUsername = _interopRequireDefault(require("./setUsername"));

var _setEmail = _interopRequireDefault(require("./setEmail"));

var _setAvatar = _interopRequireDefault(require("./setAvatar"));

var _toggleExclude = _interopRequireDefault(require("./toggleExclude"));

var _setCardConfig = _interopRequireDefault(require("./setCardConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  addStory: _addStory.default,
  changeStory: _changeStory.default,
  deleteStory: _deleteStory.default,
  trashStory: _trashStory.default,
  restoreStory: _restoreStory.default,
  importStories: _importStories.default,
  clearStoryEstimate: _clearStoryEstimate.default,
  giveStoryEstimate: _giveStoryEstimate.default,
  joinRoom: _joinRoom.default,
  kick: _kick.default,
  leaveRoom: _leaveRoom.default,
  newEstimationRound: _newEstimationRound.default,
  reveal: _reveal.default,
  selectStory: _selectStory.default,
  setUsername: _setUsername.default,
  setEmail: _setEmail.default,
  setAvatar: _setAvatar.default,
  toggleExclude: _toggleExclude.default,
  setCardConfig: _setCardConfig.default
};
/**
 * The other command schemas reference this base schema.
 * Thus every command must also adhere to these properties...
 */

exports.default = _default;
const baseCommandSchema = {
  id: 'command',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 1
    },
    userId: {
      type: 'string',
      format: 'uuidv4'
    },
    name: {
      type: 'string',
      minLength: 1
    },
    roomId: {
      type: 'string',
      minLength: 1,
      format: 'roomId'
    },
    payload: {
      type: 'object'
    }
  },
  required: ['id', 'roomId', 'name', 'payload'],
  additionalProperties: false
};
exports.baseCommandSchema = baseCommandSchema;