const refreshTokenRepository = require("../../repositories/auth/refreshTokenRepository");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");

const handleRefreshToken = async ({ cookies }) => {
  if (!cookies?.jwt) {
    throw new AppError(401, "JWT cookie not found");
  }
  const jwtRefreshToken = cookies.jwt;
  const foundUser = await refreshTokenRepository.findUserByRefreshToken(jwtRefreshToken);
  if (!foundUser) {
    throw new AppError(403, "JWT cookie not found or invalid");
  }

  const verifyResult = await new Promise((resolve) => {
    jwt.verify(
      jwtRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
          return resolve({ valid: false });
        }
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
              userId: foundUser.id,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" },
        );
        resolve({ valid: true, accessToken });
      },
    );
  });

  if (!verifyResult.valid) {
    throw new AppError(403, "Invalid token");
  }

  return { accessToken: verifyResult.accessToken };
};

module.exports = { handleRefreshToken };
