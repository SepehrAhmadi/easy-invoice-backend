const User = require("../../model/User");

const findUserByUsername = async (username) => {
  return User.findOne({ username }).exec();
};

const createUser = async (userData) => {
  return User.create(userData);
};

module.exports = { findUserByUsername, createUser };
