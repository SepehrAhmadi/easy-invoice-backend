const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {
  const message = require("../../language/message")(req);

  let userId = "null";
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    userId = decoded.UserInfo.userId;
  });

  const user = await User.findById(userId).exec();
  if (!user) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: {},
    });
  }

  let avatarUrl = "";
  if (user.avatarPath) {
    const cleanedPath = user.avatarPath.replace(/\\/g, "/");
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    avatarUrl = `${baseUrl}/${cleanedPath}`;
  }

  const userData = {
    id: user.id,
    avatar: avatarUrl,
    username: user.username,
  };

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: userData,
  });
};

const updateProfile = async (req, res) => {
  const message = require("../../language/message")(req);

  let userId = "null";
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    userId = decoded.UserInfo.userId;
  });

  const user = await User.findById(userId).exec();
  if (!user) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: {},
    });
  }

  if (!req.body.username) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const newUsername = req.body.username.toLowerCase();

  if (user.username !== newUsername) {
    const existingUser = await User.findOne({
      username: newUsername,
      _id: { $ne: req.params.id },
    }).exec();
    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        message: message.error.userExist,
      });
    }
  }

  user.username = newUsername;

  if (req.file) {
    user.avatarPath = req.file.path;
  }

  user
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.edited,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToEdit,
      });
    });
};

const changePassword = async (req, res) => {
  const message = require("../../language/message")(req);

  let userId = "null";
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    userId = decoded.UserInfo.userId;
  });

  const user = await User.findById(userId).exec();
  if (!user) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: {},
    });
  }

  if (!req.body.currentPassword && !req.body.newPassword) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const match = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!match) {
    return res.status(401).json({
      statusCode: 401,
      message: message.error.wrongCurrentPassword,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
  user.password = hashedPassword;

  user
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.passowrdChanged,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToEdit,
      });
    });
};

const deleteAvatar = async (req, res) => {
  const message = require("../../language/message")(req);

  let userId = "null";
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    userId = decoded.UserInfo.userId;
  });

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  user.avatarPath = "";

  user.save();
  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAvatar,
};
