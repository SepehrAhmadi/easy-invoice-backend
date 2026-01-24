const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/rolesList");
const verifyRoles = require("../../../middleware/verifyRoles");

const productController = require("../../../controllers/base/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(verifyRoles(ROLES_LIST.Admin), productController.addProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .put(verifyRoles(ROLES_LIST.Admin), productController.updateProduct)
  .delete(verifyRoles(ROLES_LIST.Admin), productController.deleteProduct);

module.exports = router;
