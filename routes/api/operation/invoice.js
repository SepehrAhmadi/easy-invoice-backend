const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/rolesList");
const verifyRoles = require("../../../middleware/verifyRoles");

const invoiceController = require("../../../controllers/operation/invoiceController");

router
  .route("/")
  .get(invoiceController.getAllInvoices)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.addInvoice
  );

router
  .route("/:id")
  .get(invoiceController.getInvoice)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.updateInvoice
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.deleteInvoice
  );

module.exports = router