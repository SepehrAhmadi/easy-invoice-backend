const User = require("../../model/User");

const findUserById = async (userId) => {
  return User.findById(userId).exec();
};

const findUserByIdLean = async (userId) => {
  return User.findById(userId);
};

const findUserByUsernameExcludingId = async (username, excludeId) => {
  return User.findOne({ username, _id: { $ne: excludeId } }).exec();
};

const saveUser = async (user) => {
  return user.save();
};

module.exports = {
  findUserById,
  findUserByIdLean,
  findUserByUsernameExcludingId,
  saveUser,
};
