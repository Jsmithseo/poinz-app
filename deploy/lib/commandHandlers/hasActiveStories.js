"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const hasActiveStories = room => {
  if (!room.stories) {
    return false;
  }

  const activeStories = Object.values(room.stories).filter(s => !s.trashed);
  return activeStories.length > 0;
};

var _default = hasActiveStories;
exports.default = _default;