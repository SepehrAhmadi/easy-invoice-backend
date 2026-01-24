const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async (message, fileName) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd \t HH:mm:ss")}`;
  const logItem = `${dateTime} \t ${uuid()} \t ${message}`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem + "\n"
    );
  } catch (err) {
    console.log("Error logging event:", err);
  }
};

const logger = (req, res, next) => {
  logEvent(
    `${req.method} \t ${req.headers.origin} \t ${req.url}`,
    "reqLog.txt"
  );
  next();
};

module.exports = { logger, logEvent };
