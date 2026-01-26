const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const message = require("../language/message")(req);

  const { username: user, password: pswd } = req.body;
  if (!user || !pswd)
    return res.status(400).json({
      statusCode: 400,
      message: message.error.userAndPassRequired,
    });

  // cehck duplicated usernaem
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate)
    return res.status(409).json({
      statusCode: 409,
      message: message.error.userExist,
    });

  try {
    //  encryot the password
    const hashedPassword = await bcrypt.hash(pswd, 10);

    const result = await User.create({
      username: user.toLowerCase(),
      password: hashedPassword,
    });
    result;

    res.status(201).json({
      statusCode: 201,
      message: message.success.userCreate,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

module.exports = { handleNewUser };
