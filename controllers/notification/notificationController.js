const notificationService = require("../../services/notification/notificationService");
const AppError = require("../../utils/AppError");

const getNotifications = async (req, res) => {
  const message = require("../../language/message")(req);

  try {
    const data = await notificationService.getNotifications({
      query: req.query,
      userId: req.userId,
    });

    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

const readNotification = async (req, res) => {
  const message = require("../../language/message")(req);

  try {
    console.log("notif id :", req.params.id);
    const data = await notificationService.readNotification({
      notificationId: req.params.id,
      userId: req.userId,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.readNotification,
      data,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

const readAllNotifications = async (req, res) => {
  const message = require("../../language/message")(req);

  try {
    await notificationService.readAllNotifications({ userId: req.userId });
    res.status(200).json({
      statusCode: 200,
      message: message.success.readAllNotifications,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

const getUnreadCountNotifications = async (req, res) => {
  const message = require("../../language/message")(req);

  try {
    const unreadCount = await notificationService.getUnreadCountNotifications({
      userId: req.userId,
    });

    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      unreadCount,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

module.exports = {
  getNotifications,
  readNotification,
  readAllNotifications,
  getUnreadCountNotifications,
};
