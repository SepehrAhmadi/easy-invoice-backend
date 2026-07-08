class AppError extends Error {
  constructor(statusCode, messageKey) {
    super(messageKey);
    this.statusCode = statusCode;
    this.messageKey = messageKey;
  }
}

module.exports = AppError;
