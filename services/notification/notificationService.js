const Notification = require("../../model/Notification");
const notificationMessages = require("../../language/notification/index");
const { getIO } = require("../../config/socket");
const logger = require("../../utils/logger");
const moment = require("jalali-moment");

const getNotifications = async () => {
  const notifications = await Notification.find()
    .sort({ createdDate: -1 })
    .exec();
  if (!notifications) {
    return { notifications: [] };
  }

  return notifications.map((item) => ({
    userId: item.userId,
    action: item.action,
    type: item.type,
    enTitle: item.title.en,
    faTitle: item.title.fa,
    enMessage: item.message.en,
    faMessage: item.message.fa,
    date: moment(item.date).format("M/D/YYYY HH:mm"),
    localDate: item.localDate,
    createdData: item.createdDate,
  }));
};

const create = async ({ userId, action, type, data }) => {
  try {
    if (!notificationMessages[type]) {
      throw new Error(`Notification type "${type}" not found.`);
    }

    const notificationText = notificationMessages[type](data);

    const now = new Date();
    const localDate = moment(now).locale("fa").format("YYYY/MM/DD HH:mm");

    const notification = await Notification.create({
      userId: userId,
      action,
      type,
      title: notificationText.title,
      message: notificationText.message,
      date: now,
      localDate,
      createdDate: now,
    });

    const responseNotification = {
      userId: notification.userId,
      action: notification.action,
      type: notification.type,
      enTitle: notification.title.en,
      faTitle: notification.title.fa,
      enMessage: notification.message.en,
      faMessage: notification.message.fa,
      date: moment(notification.date).format("M/D/YYYY HH:mm"),
      localDate,
      createdData: notification.createdDate,
    };
    
    const io = getIO();
    console.log("Sending notification:", notification);
    io.emit("notification", responseNotification);

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
