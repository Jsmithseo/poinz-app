"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = socketRegistryFactory;

var _getLogger = _interopRequireDefault(require("./getLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOGGER = (0, _getLogger.default)('socketRegistry');
/**
 *
 * The socketRegistry maps socketIds to userId & RoomId
 *
 * socketId -> [userId,RoomId]
 *
 *
 * we need do keep the mapping of a socket to userId and roomId
 * so that we can remove users from rooms if the socket disconnects.
 *
 *
 */

function socketRegistryFactory() {
  const registry = {};
  return {
    registerSocketMapping,
    removeSocketMapping,
    removeAllMatchingSocketMappings,
    isLastSocketForUserId,
    getMapping
  };

  function getMapping(socketId) {
    return registry[socketId];
  }

  function registerSocketMapping(socketId, userId, roomId) {
    LOGGER.debug(`Registering socket ${socketId} : user ${userId} and room ${roomId}`);

    if (registry[socketId]) {
      LOGGER.warn(`Overriding old mapping for socket ${socketId}`);
    }

    registry[socketId] = {
      userId,
      roomId
    };
  }

  function removeSocketMapping(socketId) {
    const mapping = getMapping(socketId);

    if (!mapping) {
      return;
    }

    LOGGER.debug(`Removing mapping: socket ${socketId} -> [user ${mapping.userId}, room ${mapping.roomId}]`);
    delete registry[socketId];
  }
  /**
   * will remove all mappings that match given userId and roomId
   *
   * @param userId
   * @param roomId
   * @return {string[]} Array of removed socketIds
   */


  function removeAllMatchingSocketMappings(userId, roomId) {
    LOGGER.debug(`Removing all mappings for  user ${userId}, room ${roomId}`);
    const matchingSocketEntries = Object.entries(registry).filter(entry => entry[1].userId === userId && entry[1].roomId === roomId);
    matchingSocketEntries.forEach(entry => removeSocketMapping(entry[0], userId, roomId));
    return matchingSocketEntries.map(e => e[0]);
  }

  function isLastSocketForUserId(userId) {
    const socketsOfThatUser = Object.entries(registry).filter(entry => entry[1].userId === userId);

    if (socketsOfThatUser.length > 1) {
      LOGGER.debug(`User ${userId} has multiple open sockets:  ${regEntriesToString(socketsOfThatUser)}`);
    }

    return socketsOfThatUser.length === 1;
  }

  function regEntriesToString(regEntries) {
    return regEntries.map(re => `${re[0]} -> [user ${re[1].userId}, room ${re[1].roomId}]`).join('     ');
  }
}