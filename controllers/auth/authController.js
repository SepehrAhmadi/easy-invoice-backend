const authService = require("../../services/auth/authService");
const AppError = require("../../utils/AppError");

const handleLogin = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const result = await authService.handleLogin({ body: req.body });

    res.cookie("jwt", result.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({
      statusCode: 200,
      accessToken: result.accessToken,
      username: result.username,
      message: message.success.login,
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
      message: message.error.faildToAdd,
    });
  }
};

module.exports = { handleLogin };
