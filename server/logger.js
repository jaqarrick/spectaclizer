const winston = require('winston');

const { createLogger, format, transports } = winston;

module.exports = createLogger({
  level: 'info', // Set the log level as needed
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Customize the timestamp format
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'error.log' }), // Log to a file (customize the filename)
  ],
});
