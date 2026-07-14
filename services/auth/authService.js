const authRepository = require("../../repositories/auth/authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");

const handleLogin = async ({ body }) => {
  const { username: user, password: pswd } = body;
  if (!user || !pswd) throw new AppError(400, "userAndPassRequired");

  const foundUser = await authRepository.findUserByUsername(user.toLowerCase().trim());
  if (!foundUser) throw new AppError(401, "usernameNotFond");

  const match = await bcrypt.compare(pswd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);

    // access token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username.trim(),
          userId: foundUser.id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    // refresh  token
    const refreshToken = jwt.sign(
      { username: foundUser.username.trim() },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    foundUser.refreshToken = refreshToken;
    authRepository.saveUser(foundUser);

    return {
      accessToken,
      refreshToken,
      username: user,
    };
  } else {
    throw new AppError(401, "userAndPassNotMatch");
  }
};

module.exports = { handleLogin };
