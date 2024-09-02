const express = require("express");
const User = require("../database/dating_models/userDataSchema");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");

// Get all users
router.get("/api/user-details", authenticateToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
