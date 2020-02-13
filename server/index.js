const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();
const {
  registerUser,
  loginUser,
  getAuthenticatedUser
} = require("./routes/routes");
const auth = require("./auth");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true
  },
  () => console.log("connected to database")
);

// routes
app.post("/user/register", registerUser);
app.post("/user/login", loginUser);
app.get("/user/auth", auth, getAuthenticatedUser);

app.listen(PORT, () => console.log(`listenning on port ${PORT}`));
