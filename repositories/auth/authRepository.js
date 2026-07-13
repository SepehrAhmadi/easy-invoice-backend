const User = require("../../model/User");

const findUserByUsername = async (username) => {
  return User.findOne({ username });
};

const saveUser = async (user) => {
  return user.save();
};

module.exports = { findUserByUsername, saveUser };
