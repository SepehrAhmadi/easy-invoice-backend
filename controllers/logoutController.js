const User = require("../model/User")


const handleLogout = async (req, res) => {
  const message = require("../language/message")(req);

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content

  // is refresh token in db?
  const jwtRefreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken : jwtRefreshToken}).exec()
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = ""
  await foundUser.save()

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.status(200).json({
    statusCode: 200,
    message: message.success.logout,
  });
};

module.exports = { handleLogout };
