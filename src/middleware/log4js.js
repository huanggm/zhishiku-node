const log4js = require('log4js')

log4js.configure({
  "appenders": {
    "out": {
      "type": "stdout"
    },
    "errorFile": {
      "type": "file",
      "filename": "/var/log/node/errors.log"
    },
    "errors": {
      "type": "logLevelFilter",
      "level": "WARN",
      "appender": "errorFile"
    }
  },
  "categories": {
    "default": {
      "appenders": ["errors", "out"],
      "level": "DEBUG"
    },
  }
})

exports.loggerMiddleware = log4js.connectLogger(log4js.getLogger('access'), {
  level: 'auto',
  format: ':method :url :status'
})

exports.getLogger = (name, level) => {
  let logger = log4js.getLogger(name)
  logger.level = level || 'debug'
  return logger
}