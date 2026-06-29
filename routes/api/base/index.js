const express = require("express");
const router = express.Router();

router.use("/company", require("./company"));
router.use("/brand", require("./brand"));
router.use("/category", require("./category"));
router.use("/product", require("./product"));

module.exports = router;
