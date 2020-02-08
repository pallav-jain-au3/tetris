const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
require('dotenv').config();
const {
    registerUser,
    loginUser
} = require('./routes/routes')
const auth = require('./auth')
app.use(express.json())

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true
}, () => console.log("conneted to database"))


// routes
app.post('/user/register', registerUser);
app.post('/user/login', loginUser);




app.listen(PORT, () => console.log(`listenning on port ${PORT}`))