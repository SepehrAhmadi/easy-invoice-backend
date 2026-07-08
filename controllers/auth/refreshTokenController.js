const refreshTokenService = require("../../services/auth/refreshTokenService");
const AppError = require("../../utils/AppError");

const handleRefreshToken = async (req, res) => {
  try {
    const result = await refreshTokenService.handleRefreshToken({
      cookies: req.cookies,
    });

    return res
      .status(200)
      .json({ statusCode: 200, accessToken: result.accessToken });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.messageKey,
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

module.exports = { handleRefreshToken };
