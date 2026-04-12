const express = require("express");
const router = express.Router();

const companyController = require("../../../controllers/report/companyController");

router.route("/").get(companyController.getReport);

router.route("/:id").get(companyController.getReportDetail);

module.exports = router;
