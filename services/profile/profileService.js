const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const AppError = require("../../utils/AppError");

const _getUserIdFromToken = ({ headers }) => {
  let userId = "null";
  const authHeader = headers.authorization || headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    userId = decoded.UserInfo.userId;
  });
  return userId;
};

const getProfile = async ({ headers, protocol, host }) => {
  const userId = _getUserIdFromToken({ headers });

  const user = await User.findById(userId).exec();
  if (!user) throw new AppError(200, "notFound");

  let avatarUrl = "";
  if (user.avatarPath) {
    const cleanedPath = user.avatarPath.replace(/\\/g, "/");
    const baseUrl = `${protocol}://${host}`;
    avatarUrl = `${baseUrl}/${cleanedPath}`;
  }

  return {
    id: user.id,
    avatar: avatarUrl,
    username: user.username,
  };
};

const updateProfile = async ({ headers, body, params, file }) => {
  const userId = _getUserIdFromToken({ headers });

  const user = await User.findById(userId).exec();
  if (!user) throw new AppError(200, "notFound");

  if (!body.username) throw new AppError(400, "requireFields");

  const newUsername = body.username.toLowerCase();

  if (user.username !== newUsername) {
    const existingUser = await User.findOne({
      username: newUsername,
      _id: { $ne: params.id },
    }).exec();
    if (existingUser) throw new AppError(409, "userExist");
  }

  user.username = newUsername;

  if (file) {
    user.avatarPath = file.path;
  }

  await user.save();
};

const changePassword = async ({ headers, body }) => {
  const userId = _getUserIdFromToken({ headers });

  const user = await User.findById(userId).exec();
  if (!user) throw new AppError(200, "notFound");

  if (!body.currentPassword && !body.newPassword) {
    throw new AppError(400, "requireFields");
  }

  const match = await bcrypt.compare(body.currentPassword, user.password);
  if (!match) throw new AppError(401, "wrongCurrentPassword");

  const hashedPassword = await bcrypt.hash(body.newPassword, 10);
  user.password = hashedPassword;

  await user.save();
};

const deleteAvatar = async ({ headers }) => {
  const userId = _getUserIdFromToken({ headers });

  const user = await User.findById(userId);
  if (!user) throw new AppError(400, "notFound");

  // Delete the avatar file from disk if it exists
  if (user.avatarPath) {
    const filePath = path.join(__dirname, "..", "..", user.avatarPath);
    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("Failed to delete avatar file:", err);
      }
    });
  }

  user.avatarPath = "";
  await user.save();
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAvatar,
};
