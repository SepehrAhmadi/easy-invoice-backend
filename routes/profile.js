const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");
const uploadAvatar = require("../middleware/multer/uploadAvatar")

const profileController = require("../controllers/profileController");

router.route("/:username").get(profileController.getProfile);

router
  .route("/:id")
  .put(verifyRoles(ROLES_LIST.Admin), uploadAvatar.single("avatar"), profileController.updateProfile);

router
  .route("/changePassword/:id")
  .put(verifyRoles(ROLES_LIST.Admin), profileController.changePassword);


router.route("/deleteAvatar/:id").delete(verifyRoles(ROLES_LIST.Admin), profileController.deleteAvatar);

module.exports = router;
