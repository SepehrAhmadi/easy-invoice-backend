const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.DATABASE_LOCAL_URI)
    await mongoose.connect(process.env.DATABASE_LOCAL_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB