const User = require("../../model/User");

const findUserByRefreshToken = async (refreshToken) => {
  return User.findOne({ refreshToken }).exec();
};

module.exports = { findUserByRefreshToken };
