const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose')
const {getAuthenticatedUser, loginUser, registerUser} = require('./handlers/userHandle')
const {addScore, getScore} = require('./handlers/ScoresHandle')
const auth = require('./auth')
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.json());
require("dotenv").config();


mongoose.connect(
 
  process.env.DB_HOST,
  {
    useNewUrlParser: true
  },
  () => console.log("connected to database")
);
app.get('/', function (req, res) {
  res.sendFile(path.join('build' ,'index.html'));
});

app.post("/api/user/register", registerUser);
app.post('/api/user/login', loginUser);
app.get("/api/user/auth", auth, getAuthenticatedUser);
app.post("/api/score",auth,addScore);
app.get('/api/scores', getScore);

app.listen(port, () => console.log("listenning on 8080"));