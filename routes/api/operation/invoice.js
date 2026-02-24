const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/rolesList");
const verifyRoles = require("../../../middleware/verifyRoles");

const invoiceController = require("../../../controllers/operation/invoice/invoiceController");
const invoiceItemController = require("../../../controllers/operation/invoice/invoiceItemController");

// Invoice
router
  .route("/")
  .get(invoiceController.getAllInvoices)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.addInvoice,
  );
router
  .route("/:id")
  .get(invoiceController.getInvoice)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.updateInvoice,
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.deleteInvoice,
  );

router
  .route("/:id/status")
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.changeStatus,
  );

// Invoice item
router
  .route("/:invoiceId/items")
  .get(invoiceItemController.getAllInvoiceItems)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceItemController.addInvoiceItem,
  );
router
  .route("/:invoiceId/items/:itemId")
  .get(invoiceItemController.getInvoiceItem)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceItemController.updateInvoiceItem,
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceItemController.deleteInvoiceItem,
  );

module.exports = router;
