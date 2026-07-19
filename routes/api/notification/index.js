const express = require("express");
const router = express.Router();

const notificationController = require("../../../controllers/notification/notificationController");

router.get("/", notificationController.getNotifications);
router.get("/unreadCount", notificationController.getUnreadCountNotifications);
router.post("/readAll", notificationController.readAllNotifications);
router.post("/:id/read", notificationController.readNotification);

module.exports = router;
