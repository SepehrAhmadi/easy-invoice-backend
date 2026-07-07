const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");

router.use(verifyJWT);

router.use("/notification", require("./notification"))
router.use("/dashboard", require("./dashboard"));
router.use("/profile", require("./profile"));
router.use("/dropdown", require("./dropdown"));
router.use("/base", require("./base"));
router.use("/operation", require("./operation"));
router.use("/report", require("./report"));

module.exports = router;
