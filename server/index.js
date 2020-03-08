const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const {
  registerUser,
  loginUser,
  getAuthenticatedUser
} = require("./handlers/userHandle");

const {addScore, getScore} = require('./handlers/ScoresHandle')
const auth = require("./auth");
// routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/auth", auth, getAuthenticatedUser);
router.post("/score",auth,addScore )
router.get('/scores', getScore)
module.exports = router

