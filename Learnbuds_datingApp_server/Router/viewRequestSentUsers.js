const express = require("express");
const router = express.Router();
const UserData = require("../database/dating_models/userDataSchema");
const RequestModel = require("../database/dating_models/requestModel");
const authenticateToken = require("../Middlewares/jwtAuth");

router.get("/api/view-requestSentList", authenticateToken, async (req, res) => {
    const userId = req.user;
    try {
        // Fetch the requests sent by the user
        const requestSentUsers = await RequestModel.find({ sender: userId }).populate("receiver");

        // Fetch additional details from UserData model for each receiver
        const detailedRequestSentUsers = await Promise.all(
            requestSentUsers.map(async (request) => {
                const userData = await UserData.find({ userId: request.receiver._id });
                return userData;
            })
        );

        console.log(".......Request Sent Users with Receiver Details.........:", detailedRequestSentUsers);
        res.status(200).json(detailedRequestSentUsers);
    } catch (error) {
        console.error("Error fetching Request Sent users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
