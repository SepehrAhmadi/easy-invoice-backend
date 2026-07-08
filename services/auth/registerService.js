const User = require("../../model/User");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/AppError");

const handleNewUser = async ({ body }) => {
  const { username: user, password: pswd } = body;

  if (!user || !pswd) throw new AppError(400, "userAndPassRequired");

  // check duplicated username
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) throw new AppError(409, "userExist");

  // encrypt the password
  const hashedPassword = await bcrypt.hash(pswd, 10);

  const result = await User.create({
    username: user.toLowerCase(),
    password: hashedPassword,
  });
  return result;
};

module.exports = { handleNewUser };
