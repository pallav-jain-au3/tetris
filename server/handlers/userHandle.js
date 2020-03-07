const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Score = require('../models/Score')

exports.registerUser = async (req, res) => {
  let { valid, error } = registerValidation(req.body);
  if (!valid) return res.status(400).json(error);

  const emailExist = await User.findOne({
    email: req.body.email
  });
  console.log("hi")
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
   
    let userData = {}
      userData.username =  user.username,
      userData.email=  user.email
      let scores = user.scores
      userData.scores = []
      
      if (scores.length){
      let getScores =  () => {
        return Promise.all(scores.map(score => {
          let doc =  Score.findById(score._id)
          return doc
        }))
      }
        getScores()
        .then(data => {
          data.forEach(score => {
           let scoreData = {score :score.score, createdAt : score.createdAt, scoreId :score._id}
           userData.scores.push(scoreData)
          })
        })
        .then (() =>  res.status(200).json(userData))
      }
      else {
        return res.status(200).json(userData)
      }
  } catch (error) {
    res.status(400).json({error :error.message});
  }
 
};
