const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../database/dating_models/userSchema");

router.post("/auth/login", async (req, res) => {
    console.log("login request...", req.body);
    const { email, password } = req.body;

    try {
        let user = null;
        if (email) {
            user = await User.findOne({ email });
            // console.log("Email of", user);
        } else {
            user = await User.findOne({ mob });
        }

        if (!user) {
            // console.log("invalid User Details");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            // console.log("Incorrect password");
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // If email and password are correct
        const token = jwt.sign({ userid: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        res.cookie("userEmail", user.email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        res.cookie("userid", user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        // console.log("Login successful for user:", user.email);
        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;
