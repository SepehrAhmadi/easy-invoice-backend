const express = require("express");
const router = express.Router();
const dashboardController = require("../../../controllers/dashboard/dashboardController");

router.route("/").get(dashboardController.getDashboard);

module.exports = router;
