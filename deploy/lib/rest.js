"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStatusObject = buildStatusObject;
exports.buildRoomExportObject = buildRoomExportObject;
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _stream = _interopRequireDefault(require("stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module handles incoming requests to the REST api.
 * Currently there is only one endpoint: /api/status
 *
 * All other communication between client and server (story-, estimation- and user-related)
 * is done via websocket connection.
 *
 */

/**
 *
 * @param app the express app object
 * @param store the roomsStore object
 */
function init(app, store) {
  const restRouter = _express.default.Router();

  restRouter.get('/status', (req, res) => buildStatusObject(store).then(status => res.json(status)));
  restRouter.get('/room/:roomId', (req, res) => buildRoomExportObject(store, req.params.roomId).then(roomExport => {
    if (!roomExport) {
      res.status(404).json({
        message: 'room not found'
      });
      return;
    }

    if (req.query && req.query.mode === 'file') {
      sendObjectAsJsonFile(res, roomExport, `poinz_${roomExport.roomId}.json`);
    } else {
      res.json(roomExport);
    }
  }));
  app.use('/api', restRouter);
}

var _default = {
  init
};
exports.default = _default;

function sendObjectAsJsonFile(res, data, filename) {
  const fileContents = Buffer.from(JSON.stringify(data, null, 4), 'utf-8');
  const readStream = new _stream.default.PassThrough();
  readStream.end(fileContents);
  res.set('Content-disposition', 'attachment; filename=' + filename);
  res.set('Content-Type', 'application/json');
  readStream.pipe(res);
}

async function buildStatusObject(store) {
  const allRooms = await store.getAllRooms();
  const rooms = Object.values(allRooms).map(room => ({
    storyCount: Object.values(room.stories).length,
    userCount: Object.values(room.users).length,
    userCountDisconnected: Object.values(room.users).filter(user => user.disconnected).length,
    lastActivity: room.lastActivity,
    markedForDeletion: room.markedForDeletion,
    created: room.created
  }));
  return {
    rooms,
    roomCount: rooms.length,
    uptime: Math.floor(process.uptime()),
    storeInfo: store.getStoreType()
  };
}

async function buildRoomExportObject(store, roomId) {
  const room = await store.getRoomById(roomId);

  if (!room) {
    return undefined;
  }

  return {
    roomId: room.id,
    exportedAt: Date.now(),
    stories: Object.values(room.stories).filter(story => !story.trashed).map(story => buildStoryExportObject(story, room.users))
  };
}

const buildStoryExportObject = (story, users) => ({
  title: story.title,
  description: story.description,
  estimations: Object.entries(story.estimations).map(entry => {
    const matchingUser = users[entry[0]];
    return {
      username: matchingUser ? matchingUser.username : entry[0],
      value: entry[1]
    };
  })
});