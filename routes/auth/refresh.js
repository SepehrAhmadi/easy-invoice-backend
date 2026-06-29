const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../controllers/auth/refreshTokenController");

router.route("/").get(refreshTokenController.handleRefreshToken);

module.exports = router;
