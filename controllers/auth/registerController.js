const registerService = require("../../services/auth/registerService");
const AppError = require("../../utils/AppError");

const handleNewUser = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await registerService.handleNewUser({ body: req.body });

    res.status(201).json({
      statusCode: 201,
      message: message.success.userCreate,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

module.exports = { handleNewUser };
