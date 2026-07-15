const Notification = require("../../model/notification/Notification");
const NotificationRead = require("../../model/notification/NotificatioRead");
const User = require("../../model/User");

const findNotificationsByQuery = async (query) => {
  return Notification.find(query).sort({ createdDate: -1 }).exec();
};

const findUserByIdLean = async (userId) => {
  return User.findById(userId).select("username").lean();
};

const findNotificationById = async (notificationId) => {
  return Notification.findById(notificationId).exec();
};

const findReadNotificationsByUserId = async (userId) => {
  return NotificationRead.find({ userId: userId }).exec();
};

const readNotification = async ({ notificationId, userId }) => {
  return NotificationRead.create({ notificationId, userId });
};

const createNotification = async (notificationData) => {
  return Notification.create(notificationData);
};

module.exports = {
  findNotificationsByQuery,
  findUserByIdLean,
  findNotificationById,
  findReadNotificationsByUserId,
  readNotification,
  createNotification,
};
