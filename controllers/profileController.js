const User = require("../model/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  const message = require("../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const user = await User.findById(req.params.id).exec();
  if (!user) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: {},
    });
  }

  const userData = {
    profilePicture: "",
    username: user.username,
  };

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: userData,
  });
};

const updateProfile = async (req, res) => {
  const message = require("../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const user = await User.findById(req.params.id).exec();
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

  if (req.body.username === user.username) {
    return res.status(409).json({
      statusCode: 409,
      message: message.error.userExist,
    });
  }

  user.username = req.body.username.toLowerCase();

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
  const message = require("../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const user = await User.findById(req.params.id).exec();
  if (!user) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: {},
    });
  }

  if (!req.body.oldPassword && !req.body.newPassword) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const match = await bcrypt.compare(req.body.oldPassword, user.password);
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

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
