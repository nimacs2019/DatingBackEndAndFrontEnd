const express = require("express");
const router = express.Router();
const UserData = require("../database/dating_models/userDataSchema");
const shortListModel = require("../database/dating_models/shortListModel");
const authenticateToken = require("../Middlewares/jwtAuth");

router.get("/api/shortlistedBy-User", authenticateToken, async (req, res) => {
    const userId = req.user;
    try {
        const shortlistedByUsers = await shortListModel.find({ shortListed: userId });
        console.log("ShortlistedBy Users:", shortlistedByUsers);
        const shortlistedByUsersDetails = await Promise.all(
            shortlistedByUsers.map(async (entry) => {
                const user = await UserData.find({ userId: entry.shortListedBy });
                console.log("Populated User:", user);
                return user;
            })
        );
        res.status(200).json(shortlistedByUsersDetails);
    } catch (error) {
        console.error("Error fetching shortlisted users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
