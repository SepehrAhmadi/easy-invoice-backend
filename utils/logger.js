const winston = require("winston")
require('winston-daily-rotate-file');
const { MongoDB } = require('winston-mongodb');

const { createLogger, format, transports } = winston;
const { combine, timestamp, errors, json, colorize, simple } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/requests/requests-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      level: 'http',
    }),
    new transports.DailyRotateFile({
      filename: 'logs/errors/errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      level: 'error',
    }),
    new MongoDB({            
      db: process.env.DATABASE_LOCAL_URI,
      collection: 'logs',
      level: process.env.LOG_LEVEL || 'info',
      options: { useUnifiedTopology: true },
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(colorize(), simple()),
  }));
}

module.exports = logger;