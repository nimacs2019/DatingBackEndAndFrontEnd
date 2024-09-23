const express = require("express");
const User = require("../database/dating_models/userDataSchema");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");
const mongoose = require("mongoose");

// Fetch all users excluding hidden ones
router.get("/api/user-details", authenticateToken, async (req, res) => {
    const userId = req.user;

    try {
        const loggedInUser = await User.findOne({ userId });

        if (!loggedInUser) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("...........doNotShow array:.................", loggedInUser.doNotShow);
        const excludedUserIds =
            loggedInUser.doNotShow && loggedInUser.doNotShow.length > 0
                ? loggedInUser.doNotShow.map((item) => new mongoose.Types.ObjectId(item))
                : [];

        const users = await User.find({
            userId: { $nin: excludedUserIds },
        });

        if (!users || users.length === 0) {
            console.log("No users found.");
            return res.status(404).json({ message: "No users found." });
        }

        res.json(users);
        console.log("Excluding users in doNotShow list", users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

