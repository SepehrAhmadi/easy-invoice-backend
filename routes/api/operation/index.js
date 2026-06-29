const express = require("express");
const router = express.Router();

router.use("/invoice", require("./invoice"));

module.exports = router;
