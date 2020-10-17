"use strict";

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _expressSslify = _interopRequireDefault(require("express-sslify"));

var _settings = _interopRequireDefault(require("./settings"));

var _socketServer = _interopRequireDefault(require("./socketServer"));

var _getLogger = _interopRequireDefault(require("./getLogger"));

var _rest = _interopRequireDefault(require("./rest"));

var _roomStoreFactory = _interopRequireDefault(require("./store/roomStoreFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOGGER = (0, _getLogger.default)('server');
startup().catch(err => {
  throw new Error(err);
});

async function startup() {
  const store = await (0, _roomStoreFactory.default)(_settings.default.persistentStore);
  const app = (0, _express.default)();

  if (process.env.NODE_ENV === 'production') {
    LOGGER.info('enabling HTTPS enforce...');
    app.use(_expressSslify.default.HTTPS({
      trustProtoHeader: true
    }));
  } // setup REST api


  _rest.default.init(app, store); // serve static client files


  app.use(_express.default.static(_path.default.resolve(__dirname, '../public'))); // enable html5 history mode by "forwarding" every unmatched route to the index.html file

  app.get('*', (request, response) => response.sendFile(_path.default.resolve(__dirname, '../public/index.html')));

  const httpServer = _http.default.createServer(app);

  _socketServer.default.init(httpServer, store);

  httpServer.listen(_settings.default.serverPort, () => LOGGER.info(`-- SERVER STARTED -- (${_settings.default.serverPort})`));
  process.on('SIGINT', () => {
    LOGGER.info('-- SERVER RECEIVED SIGINT, shutting down --');

    _socketServer.default.close();

    httpServer.close(() => process.exit(0));
  });
}