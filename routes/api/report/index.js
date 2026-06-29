const express = require("express");
const router = express.Router();

router.use("/packaging", require("./packaging"));
router.use("/company", require("./company"));

module.exports = router;
