const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({
    statusCode : 200,
    message: "Server is running",
  });
});

module.exports = router;
