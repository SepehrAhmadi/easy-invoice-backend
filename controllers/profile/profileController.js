const profileService = require("../../services/profile/profileService");
const AppError = require("../../utils/AppError");

const _handleProfileError = (err, res, message) => {
  if (err instanceof AppError) {
    // Profile controllers return 200 with error messages for not found (existing behavior)
    if (err.statusCode === 200) {
      return res.status(200).json({
        statusCode: 200,
        message: message.error[err.messageKey],
        data: {},
      });
    }
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: message.error[err.messageKey],
    });
  }
  console.error(err);
  return res.status(500).json({
    statusCode: 500,
    message: message.error.faildToEdit,
  });
};

const getProfile = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const userData = await profileService.getProfile({
      headers: req.headers,
      protocol: req.protocol,
      host: req.get("host"),
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: userData,
    });
  } catch (err) {
    return _handleProfileError(err, res, message);
  }
};

const updateProfile = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await profileService.updateProfile({
      headers: req.headers,
      body: req.body,
      params: req.params,
      file: req.file,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.edited,
    });
  } catch (err) {
    return _handleProfileError(err, res, message);
  }
};

const changePassword = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await profileService.changePassword({
      headers: req.headers,
      body: req.body,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.passowrdChanged,
    });
  } catch (err) {
    return _handleProfileError(err, res, message);
  }
};

const deleteAvatar = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await profileService.deleteAvatar({
      headers: req.headers,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.deleted,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToEdit,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAvatar,
};
