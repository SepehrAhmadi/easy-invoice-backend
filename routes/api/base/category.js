const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/rolesList");
const verifyRoles = require("../../../middleware/verifyRoles");

const categoryController = require("../../../controllers/base/categoryController");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(verifyRoles(ROLES_LIST.Admin), categoryController.addCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(verifyRoles(ROLES_LIST.Admin), categoryController.updateCategory)
  .delete(verifyRoles(ROLES_LIST.Admin), categoryController.deleteCategory);

module.exports = router;

