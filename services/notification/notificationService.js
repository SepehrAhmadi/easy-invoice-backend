const notificationRepository = require("../../repositories/notification/notificationRepository");
const notificationMessages = require("../../language/notification/index");
const { getIO } = require("../../config/socket");
const logger = require("../../utils/logger");
const moment = require("jalali-moment");
const AppError = require("../../utils/AppError");

const getNotifications = async ({ query: queryParams, userId }) => {
  const { fromDate, toDate } = queryParams;

  let query = {};

  if (fromDate || toDate) {
    const isValidFrom = moment(fromDate, "jYYYY/jMM/jDD", true).isValid();
    const isValidTo = moment(toDate, "jYYYY/jMM/jDD", true).isValid();

    if (!isValidFrom || !isValidTo) {
      throw new AppError(400, "invalidDate");
    }

    query.date = {
      $gte: moment(fromDate, "jYYYY/jMM/jDD").startOf("day").toDate(),
      $lte: moment(toDate, "jYYYY/jMM/jDD").endOf("day").toDate(),
    };
  }

  const notifications =
    await notificationRepository.findNotificationsByQuery(query);

  if (!notifications.length) {
    return [];
  }

  const readNotifications =
    await notificationRepository.findReadNotificationsByUserId(userId);

  const readNotificationIds = new Set(
    readNotifications.map((item) => item.notificationId.toString()),
  );

  const notificationsData = await Promise.all(
    notifications.map(async (item) => {
      const user = await notificationRepository.findUserByIdLean(item.userId);

      return {
        id: item._id,
        userId: item.userId,
        username: user?.username,
        action: item.action,
        type: item.type,
        enTitle: item.title.en,
        faTitle: item.title.fa,
        enMessage: item.message.en,
        faMessage: item.message.fa,
        isRead: readNotificationIds.has(item._id.toString()),
        date: moment(item.date).format("M/D/YYYY HH:mm"),
        localDate: item.localDate,
      };
    }),
  );

  return notificationsData;
};

const readNotification = async ({ notificationId, userId }) => {
  try {
    if (!notificationId) throw new AppError(400, "idRequired");

    const notification =
      await notificationRepository.findNotificationById(notificationId);
    if (!notification) throw new AppError(400, "notFound");

    await notificationRepository.readNotification({
      notificationId,
      userId,
    });

    const user = await notificationRepository.findUserByIdLean(
      notification.userId,
    );

    return {
      id: notification._id,
      userId: notification.userId,
      username: user?.username,
      action: notification.action,
      type: notification.type,
      enTitle: notification.title.en,
      faTitle: notification.title.fa,
      enMessage: notification.message.en,
      faMessage: notification.message.fa,
      isRead: true,
      date: moment(notification.date).format("M/D/YYYY HH:mm"),
      localDate: notification.localDate,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;

    logger.error({
      message: error.message,
      stack: error.stack,
      method: "notificationService.read",
    });

    throw error;
  }
};

const readAllNotifications = async ({ userId }) => {
  try {
    const notifications =
      await notificationRepository.findNotificationsByUserId(userId);
    if (!notifications) throw new AppError(400, "notFound");

    const user = await notificationRepository.findUserByIdLean(userId);

    const responseData = await Promise.all(
      notifications.map(async (notification) => {
        await notificationRepository.readNotification({
          notificationId: notification._id,
          userId,
        });
      }),
    );
  } catch (error) {
    if (error instanceof AppError) throw error;

    logger.error({
      message: error.message,
      stack: error.stack,
      method: "notificationService.read",
    });

    throw error;
  }
};

const create = async ({ userId, action, type, data }) => {
  try {
    if (!notificationMessages[type]) {
      throw new Error(`Notification type "${type}" not found.`);
    }

    const notificationText = notificationMessages[type](data);

    const now = new Date();
    const localDate = moment(now).locale("fa").format("YYYY/MM/DD HH:mm");

    const notification = await notificationRepository.createNotification({
      userId,
      action,
      type,
      title: notificationText.title,
      message: notificationText.message,
      date: now,
      localDate,
      createdDate: now,
    });

    const user = await notificationRepository.findUserByIdLean(userId);

    const responseNotification = {
      userId: notification.userId,
      username: user?.username,
      action: notification.action,
      type: notification.type,
      enTitle: notification.title.en,
      faTitle: notification.title.fa,
      enMessage: notification.message.en,
      faMessage: notification.message.fa,
      isRead: false,
      date: moment(notification.date).format("M/D/YYYY HH:mm"),
      localDate,
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
  readNotification,
  readAllNotifications,
  create,
};
