const express = require("express");
const router = express.Router();
const UserData = require("../database/dating_models/userDataSchema");
const shortListModel = require("../database/dating_models/shortListModel");
const authenticateToken = require("../Middlewares/jwtAuth");

router.get("/api/myShortlistedUsers", authenticateToken, async (req, res) => {
    const userId = req.user;
    try {
        const shortlistedUsers = await shortListModel.find({ shortListedBy: userId });
        console.log("Shortlisted Users:", shortlistedUsers);
        const shortlistedUsersDetails = await Promise.all(
            shortlistedUsers.map(async (entry) => {
                const user = await UserData.find({ userId: entry.shortListed });
                console.log("Populated User:", user);
                return user;
            })
        );
        res.status(200).json(shortlistedUsersDetails);
    } catch (error) {
        console.error("Error fetching shortlisted users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
