const express = require("express");
const router = express.Router();

router.use("/register", require("./register"));
router.use("/auth", require("./login"));
router.use("/refresh", require("./refresh"));
router.use("/logout", require("./logout"));

module.exports = router;
