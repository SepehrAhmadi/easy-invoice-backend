const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username: user, password: pswd } = req.body;
  if (!user || !pswd)
    return res.status(400).json({
      statusCode: 400,
      message: "Username and Password are required",
    });

  // cehck duplicated usernaem
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate)
    return res.status(409).json({
      statusCode: 409,
      message: `username ${user} alredy exist`,
    });

  try {
    //  encryot the password
    const hashedPassword = await bcrypt.hash(pswd, 10);
    
    const result = await User.create({
      username: user.toLowerCase(),
      password: hashedPassword,
    });
    (result);

    res.status(201).json({
      statusCode: 201,
      message: `New User ${user} created.`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

module.exports = { handleNewUser };
