const User = require("../../model/User");

const findUserByRefreshToken = async (refreshToken) => {
  return User.findOne({ refreshToken }).exec();
};

const saveUser = async (user) => {
  return user.save();
};

module.exports = { findUserByRefreshToken, saveUser };
