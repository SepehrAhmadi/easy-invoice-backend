const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    userId: req.user?.id || 'unauthenticated',
    statusCode: err.status || 500,
  });

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;