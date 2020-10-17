"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _socketManager = _interopRequireDefault(require("./socketManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let io;
let socketManager;
var _default = {
  init,
  close: () => io.close()
};
exports.default = _default;

function init(httpServer, store) {
  io = (0, _socket.default)(httpServer);

  const sendEventToRoom = (roomId, event) => io.to(roomId).emit('event', event); // we dont want to pass "io" down to factory and registry. pass down a cb instead...


  const removeSocketFromRoomByIds = (socketId, roomId) => {
    const connectedSocket = io.sockets.connected[socketId];

    if (connectedSocket) {
      connectedSocket.leave(roomId);
    }
  };

  socketManager = (0, _socketManager.default)(store, sendEventToRoom, removeSocketFromRoomByIds);
  io.on('connect', socket => {
    socket.on('disconnect', () => socketManager.onDisconnect(socket));
    socket.on('command', msg => socketManager.handleIncomingCommand(socket, msg));
  });
}