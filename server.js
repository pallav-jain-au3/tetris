const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const router = require('./server/index.js')
app.use(express.static(__dirname));
const mongoose = require('mongoose')
require("dotenv").config();

app.use(express.static(path.join(__dirname, 'client/build/static')));
app.use(express.json());


mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true
  },
  () => console.log("connected to database")
);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', router)
app.listen(port, () => console.log("listenning on 8080"));