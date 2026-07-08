const notificationService = require("../../services/notification/notificationService");

const getNotifications = async (req, res) => {
  const message = require("../../language/message")(req);

  const notificationsData = await notificationService.getNotifications();

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      notifications: notificationsData,
    },
  });
};

module.exports = { getNotifications };
