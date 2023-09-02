const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "secret";


const registerUser = asyncHandler(async (req, res) => {
    try {
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, msg: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        let success = false;
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, msg: "Invalid Credentials" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ success, msg: "Invalid Credentials" });
        }
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = { registerUser, loginUser };