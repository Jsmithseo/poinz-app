"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNewRoomsStore;

var _persistentRoomsStore = _interopRequireDefault(require("./persistentRoomsStore"));

var _inMemoryRoomsStore = _interopRequireDefault(require("./inMemoryRoomsStore"));

var _getLogger = _interopRequireDefault(require("../getLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOGGER = (0, _getLogger.default)('roomStoreFactory');
/**
 * will return either a persistent or in-memory rooms store
 * @param {boolean | object} persistent  Either falsy, then inMemory storage is used, or a configuration object for the persistent storage.
 * @returns {{init, getRoomById, saveRoom, getAllRooms}}
 */

async function getNewRoomsStore(persistent) {
  const store = persistent ? _persistentRoomsStore.default : _inMemoryRoomsStore.default;
  await store.init(persistent);
  const houseKeepingResult = await store.housekeeping();
  logHouseKeepingResult(houseKeepingResult);
  return store;
}

function logHouseKeepingResult(result) {
  LOGGER.info(`houskeeping for roomStore done. Marked rooms for deletion ${JSON.stringify(result.markedForDeletion)} (${result.markedForDeletion.length}). Deleted rooms ${JSON.stringify(result.deleted)} (${result.deleted.length}).`);
}