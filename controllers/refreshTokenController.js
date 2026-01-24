const User = require("../model/User")
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({
      statusCode: 401,
      message: "JWT cookie not found",
    });
  const jwtRefreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken : jwtRefreshToken}).exec();
  if (!foundUser)
    return res.status(403).json({
      statusCode: 403,
      message: `JWT cookie not found or invalid`,
    });

  jwt.verify(jwtRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.status(403).json({
        statusCode: 403,
        message: "Invalid token",
      });
    }
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ statusCode: 200, accessToken });
  });
};

module.exports = { handleRefreshToken };
