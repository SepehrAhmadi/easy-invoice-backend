const User = require("../../model/User");

const handleLogout = async ({ cookies }) => {
  // Return values:
  //  noCookie -> true (caller responds with 204)
  //  cleared -> { userFound: bool } (caller already cleared cookie/logout response)
  if (!cookies?.jwt) {
    return { noCookie: true };
  }

  // is refresh token in db?
  const jwtRefreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken: jwtRefreshToken }).exec();
  if (!foundUser) {
    return { noCookie: true, missingUser: true };
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  return { noCookie: false };
};

module.exports = { handleLogout };
