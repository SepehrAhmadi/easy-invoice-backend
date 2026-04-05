const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");
const uploadAvatar = require("../middleware/multer/uploadAvatar");

const profileController = require("../controllers/profileController");

router.route("/:username").get(profileController.getProfile);

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), profileController.getProfile)
  .put(
    verifyRoles(ROLES_LIST.Admin),
    uploadAvatar.single("avatar"),
    profileController.updateProfile,
  );

router
  .route("/changePassword/")
  .put(verifyRoles(ROLES_LIST.Admin), profileController.changePassword);

router
  .route("/deleteAvatar/")
  .delete(verifyRoles(ROLES_LIST.Admin), profileController.deleteAvatar);

module.exports = router;
