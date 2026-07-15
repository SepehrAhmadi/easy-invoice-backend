const express = require("express");
const router = express.Router();

const notificationController = require("../../../controllers/notification/notificationController");

router.get("/", notificationController.getNotifications);
// place static paths before param routes
router.post("/readAll", notificationController.getNotifications);
router.post("/:id/read", notificationController.readNotification);

module.exports = router;
