const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/rolesList");
const verifyRoles = require("../../../middleware/verifyRoles");

const brandController = require("../../../controllers/base/brandController");

router
  .route("/")
  .get(brandController.getAllBrands)
  .post(verifyRoles(ROLES_LIST.Admin), brandController.addBrand);

router
  .route("/:id")
  .get(brandController.getBrand)
  .put(verifyRoles(ROLES_LIST.Admin), brandController.updateBrand)
  .delete(verifyRoles(ROLES_LIST.Admin), brandController.deleteBrand);

module.exports = router;
