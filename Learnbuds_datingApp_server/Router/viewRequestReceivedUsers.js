const express = require("express");
const router = express.Router();
const UserData = require("../database/dating_models/userDataSchema");
const RequestModel = require("../database/dating_models/requestModel");
const authenticateToken = require("../Middlewares/jwtAuth");

router.get("/api/request-received", authenticateToken, async (req, res) => {
    const userId = req.user;
    try {
        const requestReceivedUser = await RequestModel.find({ receiver: userId, status: "pending" });
        console.log("request sent Users:", requestReceivedUser);
        const requestReceivedUserDetails = await Promise.all(
            requestReceivedUser.map(async (entry) => {
                const user = await UserData.find({ userId: entry.sender });
                console.log("Populated User:", user);
                return user;
            })
        );
        res.status(200).json(requestReceivedUserDetails);
    } catch (error) {
        console.error("Error fetching request received users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
