"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parseCsvDataUrlToStories = _interopRequireDefault(require("./parseCsvDataUrlToStories"));

var _hasActiveStories = _interopRequireDefault(require("./hasActiveStories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A user wants to import multiple stories.
 * payload.data is expected to be a base64 encoded "data url" (something like   data:text/csv;base64,U3VtbWFyeSxJc3N1ZSBrZXksSXNzdW.......   )
 *
 * Will trigger "storyAdded" events for all successfully parsed stories
 * Will trigger "storySelected" event, if no story is selected
 *
 */
const schema = {
  allOf: [{
    $ref: 'command'
  }, {
    properties: {
      payload: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            format: 'csvDataUrl'
          }
        },
        required: ['data'],
        additionalProperties: false
      }
    }
  }]
};
const importStoriesCommandHandler = {
  schema,
  fn: (room, command) => {
    try {
      const stories = (0, _parseCsvDataUrlToStories.default)(command.payload.data);

      if (stories.length < 1) {
        applyFailed(room, new Error('No Stories in payload'));
        return;
      }

      stories.forEach(story => {
        room.applyEvent('storyAdded', story);
      });

      if (!(0, _hasActiveStories.default)(room)) {
        // this is the first story that gets added (or all other stories are "trashed")
        room.applyEvent('storySelected', {
          storyId: stories[0].id
        });
      }
    } catch (err) {
      applyFailed(room, err);
    }
  }
};
var _default = importStoriesCommandHandler;
exports.default = _default;

function applyFailed(room, err) {
  room.applyEvent('importFailed', {
    message: err.message
  });
}