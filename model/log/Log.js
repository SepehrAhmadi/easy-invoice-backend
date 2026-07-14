const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    level: String,
    message: String,
    timestamp: Date,
    meta: {
      stack: String,
      method: String,
      url: String,
      userId: String,
      statusCode: Number,
    },
  }
);

module.exports = mongoose.model("Log", logSchema);