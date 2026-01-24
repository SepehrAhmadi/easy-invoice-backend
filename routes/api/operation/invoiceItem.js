const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/rolesList");
const verifyRoles = require("../../../middleware/verifyRoles");

const invoiceItemController = require("../../../controllers/operation/invoiceItemController");

router
  .route("/")
  .get(invoiceItemController.getAllInvoiceItems)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceItemController.addInvoiceItem
  );

router
  .route("/:id")
  .get(invoiceItemController.getInvoiceItem)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceItemController.updateInvoiceItem
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceItemController.deleteInvoiceItem
  );

module.exports = router;
