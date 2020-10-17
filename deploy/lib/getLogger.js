"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _winstonDailyRotateFile = _interopRequireDefault(require("winston-daily-rotate-file"));

var _settings = _interopRequireDefault(require("./settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = getLogger;
/**
 * Returns a new Logger for your component
 *
 * @param {string} loggerName
 * @returns {object} the new Logger
 */

exports.default = _default;

function getLogger(loggerName) {
  const {
    format
  } = _winston.default;

  const formatter = info => {
    const splat = info[Symbol.for('splat')] || info.splat || [];
    return `${info.timestamp} ${info.level}: |POINZ| [${loggerName}] ${info.message}  ${splat && splat.length ? splat.map(s => JSON.stringify(s, null, 4)) : ''}  ${info.stack ? ' ' + info.stack : ''}`;
  };

  return _winston.default.loggers.add(loggerName, {
    transports: [// in prod deployment on heroku, the console gets streamed to Logz.io (ELK stack)
    new _winston.default.transports.Console({
      level: _settings.default.log.console.level,
      handleExceptions: true,
      format: format.combine(format.timestamp(), format.align(), format.printf(formatter))
    }), new _winstonDailyRotateFile.default({
      filename: _settings.default.log.file.name,
      level: _settings.default.log.file.level,
      timestamp: true,
      handleExceptions: true,
      format: format.combine(format.timestamp(), format.align(), format.printf(formatter))
    })]
  });
}