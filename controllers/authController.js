const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async (req, res) => {
  const { username: user, password: pswd } = req.body;
  if (!user || !pswd)
    return res.status(400).json({
      statusCode: 400,
      message: "Username and Password are required",
    });

  const foundUser = await User.findOne({username : user})
  if (!foundUser)
    return res.status(401).json({
      statusCode: 401,
      message: `Username ${user} not exist`,
    });

  const match = await bcrypt.compare(pswd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);

    // access token
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    // refresh  token
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken
    foundUser.save()

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    return res.status(200).json({
      statusCode: 200,
      accessToken,
      message: `User ${user} is logged in`,
    });
  } else {
    return res.status(401).json({
      statusCode: 401,
      message: `Username and Password doesn't match`,
    });
  }
};

module.exports = { handleLogin };
