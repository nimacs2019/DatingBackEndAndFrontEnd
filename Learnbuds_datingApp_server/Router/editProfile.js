const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");
const UserData = require("../database/dating_models/userDataSchema");

router.put("/api/update-profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.cookies.userId;
        const updatedProfileData = req.body;

        // Update the profile in the database
        const updatedProfile = await UserData.findOneAndUpdate({ userId }, updatedProfileData, { new: true });

        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
});

module.exports = router