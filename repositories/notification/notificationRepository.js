const Notification = require("../../model/Notification");
const User = require("../../model/User");

const findNotificationsByQuery = async (query) => {
  return Notification.find(query).sort({ createdDate: -1 }).exec();
};

const findUserByIdLean = async (userId) => {
  return User.findById(userId).select("username").lean();
};

const createNotification = async (notificationData) => {
  return Notification.create(notificationData);
};

module.exports = {
  findNotificationsByQuery,
  findUserByIdLean,
  createNotification,
};
