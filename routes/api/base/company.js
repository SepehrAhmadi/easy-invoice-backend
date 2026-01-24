const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/rolesList");
const verifyRoles = require("../../../middleware/verifyRoles");

const compnayController = require("../../../controllers/base/companyController");

router
  .route("/")
  .get(compnayController.getAllCompanies)
  .post(verifyRoles(ROLES_LIST.Admin), compnayController.addCompany);

router
  .route("/:id")
  .get(compnayController.getCompany)
  .put(verifyRoles(ROLES_LIST.Admin), compnayController.updateCompany)
  .delete(verifyRoles(ROLES_LIST.Admin), compnayController.deleteCompany);

module.exports = router;
