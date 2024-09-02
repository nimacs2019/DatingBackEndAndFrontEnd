const express = require("express");
const router = express.Router();
const RequestModel = require("../database/dating_models/requestModel");
const NotificationModel = require("../database/dating_models/requestNotificationSchema");
const authenticateToken = require("../Middlewares/jwtAuth");

router.post("/request-send", authenticateToken, async (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user;
    console.log('......receiver id.....',receiverId);

    try {
        const existingRequest = await RequestModel.findOne({ sender: senderId, receiver: receiverId });

        if (existingRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }

        const newRequest = new RequestModel({
            sender: senderId,
            receiver: receiverId,
        });

        await newRequest.save();

        const notification = new NotificationModel({
            receiver: receiverId,
            sender: senderId,
            type: "request",
            message: "You have received a new request.",
        });

        await notification.save();

        res.status(201).json({ message: "Request sent successfully" });
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
