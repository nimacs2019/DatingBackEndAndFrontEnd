
const jwt = require("jsonwebtoken");
const User = require("../database/dating_models/userSchema");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({ message: "Access token is missing or invalid" });
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Token validated:", verifiedToken);
        const user = await User.findById(verifiedToken.userid);
        // console.log("Authendicated User", user);
        if (!user) {
            return res.status(401).json({ message: "Unautherised" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token is not valid" });
    }
};

module.exports = authenticateToken;
