const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Access token is missing or invalid" });
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!verifiedToken.isAdmin) {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        req.user = verifiedToken;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token is not valid" });
    }
};

module.exports = authenticateAdmin;
