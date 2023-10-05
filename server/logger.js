const winston = require('winston');

const { createLogger, format, transports } = winston;

module.exports = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log' }),
  ],
});
