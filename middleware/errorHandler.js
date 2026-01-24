const { logEvent } = require("./logEvent");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
  logEvent(`${err.name} ${err.message}`, "errorLog.txt");
};

module.exports = errorHandler;
