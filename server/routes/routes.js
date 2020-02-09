const User = require("../models/User");
const {
    registerValidation,
    loginValidation
} = require("../validations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    let error = registerValidation(req.body);
    if (error) return res.status(400).json({
        error: error.details[0].message
    });

    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist)
        return res.status(400).json({
            error: "Email already exists"
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
        res.json({
            user: savedData._id
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.loginUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const error = loginValidation(req.body);
    if (error) return res.status(400).json({
        error: error.details[0].message
    });
    const user = await User.findOne({
        username
    });
    if (!user) return res.status(400).json({
        error: "Username does not exists"
    });
    const validPass = await bcrypt.compare(password, user.password);
    console.log(validPass);
    if (!validPass) return res.status(400).json({
        error: "Invalid Password"
    });
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
};