const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");
const UserData = require("../database/dating_models/userDataSchema");

router.get("/api/my-profile", authenticateToken, async (req, res) => {
    const { _id } = req.user;

    try {
        const userId = _id;
        const userProfileData = await UserData.findOne({ userId });
        if (!userProfileData) {
            return res.status(404).json({ error: "User data not found" });
        }
        res.json(userProfileData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
