const express = require("express");
const router = express.Router();
const UserData = require("../database/dating_models/userDataSchema");
const RequestModel = require("../database/dating_models/requestModel");
const authenticateToken = require("../Middlewares/jwtAuth");

router.get("/api/rejected-request", authenticateToken, async (req, res) => {
    const userId = req.user;
    try {
        // Fetch the requests sent by the user
        const requestRejectedUsers = await RequestModel.find({ sender: userId, status: "rejected" }).populate("receiver");
        console.log(requestRejectedUsers);
        // Fetch additional details from UserData model for each receiver
        const requestRejectedUsersData = await Promise.all(
            requestRejectedUsers.map(async (request) => {
                const userData = await UserData.findOne({ userId: request.receiver._id });

                return {
                    requestId: request._id,
                    receiver: userData ? userData.toObject() : null,
                    status: request.status,
                };
            })
        );

        console.log(".......Request Sent Users with Receiver Details.........:", requestRejectedUsersData);
        res.status(200).json(requestRejectedUsersData);
    } catch (error) {
        console.error("Error fetching Request Sent users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
