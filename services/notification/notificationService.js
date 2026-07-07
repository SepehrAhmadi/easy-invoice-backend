const Notification = require("../../model/Notification");
const notificationMessages = require("../../language/notification/index");
const { getIO } = require("../../config/socket");
const logger = require("../../utils/logger");

const create = async ({ userId, type, data }) => {
  try {

    if (!notificationMessages[type]) {
      throw new Error(`Notification type "${type}" not found.`);
    }

    const notificationText = notificationMessages[type](data);

    const notification = await Notification.create({
      userId: userId,
      type,
      title: notificationText.title,
      message: notificationText.message,
      createdDate: new Date(),
    });

    const io = getIO();

    io.emit("notification", notification);

    return notification;
  } catch (err) {
    logger.error({
      message: err.message,
      stack: err.stack,
      method: "notificationService.create",
    });

    throw err;
  }
};

module.exports = {
  create,
};
