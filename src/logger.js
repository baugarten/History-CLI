const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: 'hist.log',
      level: 'info'
    })
  ]
});

logger.out = console.log;

module.exports = logger;
