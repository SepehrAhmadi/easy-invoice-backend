const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");

const profileController = require("../controllers/profileController");

router
  .route("/:id")
  .get(profileController.getProfile)
  .put(verifyRoles(ROLES_LIST.Admin), profileController.updateProfile);

router
  .route("/changePassword/:id")
  .put(verifyRoles(ROLES_LIST.Admin), profileController.changePassword);

module.exports = router;
