const express = require("express");
const router = express.Router();
const ROLE_LIST = require("../../config/rolesList");
const verifyRole = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

const logViewerController = require("../../controllers/log/logViewerController");


router.get("/", logViewerController.showViewer);
router.get("/data", logViewerController.getLogs);

module.exports = router;
