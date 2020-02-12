const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  let { valid, error } = registerValidation(req.body);
  if (!valid) return res.status(400).json(error);

  const emailExist = await User.findOne({
    email: req.body.email
  });
  if (emailExist)
    return res.status(400).json({
      email: "Email already exists"
    });
  const usernameExist = await User.findOne({
    username: req.body.username
  });
  if (usernameExist)
    return res.status(400).json({
      username: "username already exists"
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedData = await user.save();
    const token = jwt.sign(
      {
        _id: savedData._id
      },
      process.env.TOKEN_SECRET
    );
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  let { valid, error } = loginValidation(req.body);
  if (!valid) return res.status(400).json(error);
  const user = await User.findOne({
    username
  });
  if (!user)
    return res.status(400).json({
      username: "Username does not exists"
    });
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({
      password: "Invalid Password"
    });
  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.TOKEN_SECRET
  );
  res.status(200).json({ token: token });
};

exports.getAuthenticatedUser = async (req, res) => {
  let _id = req.user;
  try {
    const user = await User.findOne({ _id });
    res.status(200).json({
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
