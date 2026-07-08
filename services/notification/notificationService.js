const Notification = require("../../model/Notification");
const notificationMessages = require("../../language/notification/index");
const { getIO } = require("../../config/socket");
const logger = require("../../utils/logger");

const getNotifications = async () => {
  const notifications = await Notification.find().exec();
  if (!notifications) {
    return { notifications: [] };
  }

  return notifications.map((item) => ({
    userId: item.userId,
    type: item.type,
    enTitle: item.title.en,
    faTitle: item.title.fa,
    enMessage: item.message.en,
    faMessage: item.message.fa,
    createdData: item.createdDate,
  }));
};

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
  getNotifications,
  create,
};
