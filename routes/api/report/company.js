const express = require("express");
const router = express.Router();

const companyController = require("../../../controllers/report/companyController");

router.route("/").get(companyController.getReport);

router.route("/invoices/:companyId").get(companyController.getInvoices);

router.route("/invoiceItems/:invoiceId").get(companyController.getInvoiceItems);

module.exports = router;
