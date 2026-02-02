const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const message = require("../language/message")(req);

  const { username: user, password: pswd } = req.body;
  if (!user || !pswd)
    return res.status(400).json({
      statusCode: 400,
      message: message.error.userAndPassRequired,
    });

  const foundUser = await User.findOne({ username: user });
  if (!foundUser)
    return res.status(401).json({
      statusCode: 401,
      message: message.error.usernameNotFond,
    });

  const match = await bcrypt.compare(pswd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);

    // access token
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    // refresh  token
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    foundUser.refreshToken = refreshToken;
    foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      secure: false,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    return res.status(200).json({
      statusCode: 200,
      accessToken,
      message: message.success.login,
    });
  } else {
    return res.status(401).json({
      statusCode: 401,
      message: message.error.userAndPassNotMatch,
    });
  }
};

module.exports = { handleLogin };
