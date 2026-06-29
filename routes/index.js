const express = require("express");
const router = express.Router();

router.use("/health", require("./health"));
router.use("/", require("./root"));
router.use("/", require("./auth"));
router.use("/", require("./api"));

module.exports = router;
