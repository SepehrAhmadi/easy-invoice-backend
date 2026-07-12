const Notification = require("../../model/Notification");
const User = require("../../model/User");
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

  const notificationsData = await Promise.all(
    notifications.map(async (item) => {
      const user = await User.findById(item.userId).select("username").lean();

      return {
        userId: item.userId,
        user: user?.username,
        action: item.action,
        type: item.type,
        enTitle: item.title.en,
        faTitle: item.title.fa,
        enMessage: item.message.en,
        faMessage: item.message.fa,
        date: moment(item.date).format("M/D/YYYY HH:mm"),
        localDate: item.localDate,
        createdDate: item.createdDate,
      };
    }),
  );

  return notificationsData;
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
      userId,
      action,
      type,
      title: notificationText.title,
      message: notificationText.message,
      date: now,
      localDate,
      createdDate: now,
    });

    const user = await User.findById(userId).select("username").lean();

    const responseNotification = {
      userId: notification.userId,
      username: user?.username,
      action: notification.action,
      type: notification.type,
      enTitle: notification.title.en,
      faTitle: notification.title.fa,
      enMessage: notification.message.en,
      faMessage: notification.message.fa,
      date: moment(notification.date).format("M/D/YYYY HH:mm"),
      localDate,
      createdDate: notification.createdDate,
    };

    const io = getIO();
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
