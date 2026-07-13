const logoutRepository = require("../../repositories/auth/logoutRepository");

const handleLogout = async ({ cookies }) => {
  // Return values:
  //  noCookie -> true (caller responds with 204)
  //  cleared -> { userFound: bool } (caller already cleared cookie/logout response)
  if (!cookies?.jwt) {
    return { noCookie: true };
  }

  // is refresh token in db?
  const jwtRefreshToken = cookies.jwt;
  const foundUser = await logoutRepository.findUserByRefreshToken(jwtRefreshToken);
  if (!foundUser) {
    return { noCookie: true, missingUser: true };
  }

  foundUser.refreshToken = "";
  await logoutRepository.saveUser(foundUser);

  return { noCookie: false };
};

module.exports = { handleLogout };
