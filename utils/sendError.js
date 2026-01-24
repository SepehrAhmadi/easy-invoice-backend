module.exports = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    statusCode,
    message,
  });
};