const Notification = require("../../model/Notification");

const getNotification = async (req, res) => {
  const message = require("../../language/message")(req);

  const notifications = await Notification.find().exec();
  if (!notification) {
    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: [],
    });
  }

  const notificationsData = notifications.map((item) => ({
    userId: item.userId,
    type: item.type,
    enTitle: item.title.en,
    faTitle: item.title.fa,
    enMessage: item.message.en,
    faMessage: item.message.fa,
    createdData: item.createdDate,
  }));

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      notifications: notificationsData,
    },
  });
};

module.exports = { getNotification };
