const express = require("express");
const router = express.Router();

const notificationController = require("../../../controllers/notification/notificationController");

router.get("/", notificationController.getNotifications);
router.post("/:id/read", notificationController.readNotification);
router.post("/readAll", notificationController.readAllNotifications);

module.exports = router;
