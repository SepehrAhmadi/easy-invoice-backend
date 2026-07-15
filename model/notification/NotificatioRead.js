const mongoose = require("mongoose");

const NotificationRead = new mongoose.Schema({
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  readAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NotificationRead", NotificationRead);
