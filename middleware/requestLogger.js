const morgan = require("morgan");
const logger = require("../utils/logger");

// Stream Morgan output into Winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

module.exports = morgan(
  ":method :url :status :res[content-length] - :response-time ms - :remote-addr",
  { stream },
);
