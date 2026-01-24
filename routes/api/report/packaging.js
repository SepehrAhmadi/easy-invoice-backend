const express = require("express");
const router = express.Router();

const packagingController = require("../../../controllers/report/packagingController");

router.route("/").get(packagingController.getReport);

router.route("/:id").get(packagingController.getReportDetail);

module.exports = router;
