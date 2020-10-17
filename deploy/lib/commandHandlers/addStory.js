"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _hasActiveStories = _interopRequireDefault(require("./hasActiveStories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A user adds a story to the estimation backlog of the room
 */
const schema = {
  allOf: [{
    $ref: 'command'
  }, {
    properties: {
      payload: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            minLength: 1,
            maxLength: 100
          },
          description: {
            type: 'string',
            minLength: 0,
            maxLength: 2000
          }
        },
        required: ['title'],
        additionalProperties: false
      }
    }
  }]
};
const addStoryCommandHandler = {
  schema,
  fn: (room, command) => {
    const newStoryId = (0, _uuid.v4)();
    room.applyEvent('storyAdded', { ...command.payload,
      id: newStoryId,
      estimations: {},
      createdAt: Date.now()
    });

    if (!(0, _hasActiveStories.default)(room)) {
      // this is the first story that gets added (or all other stories are "trashed")
      room.applyEvent('storySelected', {
        storyId: newStoryId
      });
    }
  }
};
var _default = addStoryCommandHandler;
exports.default = _default;