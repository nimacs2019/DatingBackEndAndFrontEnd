const express = require("express");
const router = express.Router();
const NotificationModel = require("../database/dating_models/requestNotificationSchema");
const RequestModel = require("../database/dating_models/requestModel");
const User = require("../database/dating_models/userDataSchema");
const authenticateToken = require("../Middlewares/jwtAuth");

router.post("/api/accept-request", authenticateToken, async (req, res) => {
    const { senderID } = req.body;
    const receiverID = req.user;
    console.log("notification ids ", senderID, receiverID);

    try {
        // Find and update the notification status to 'accepted'
        const updatedNotification = await NotificationModel.findOneAndUpdate(
            {
                sender: senderID,
                receiver: receiverID,
                status: "pending",
            },
            { status: "accepted" },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        // Find and update the corresponding request status to 'accepted'
        const requestUpdate = await RequestModel.findOneAndUpdate(
            {
                sender: senderID,
                receiver: receiverID,
            },
            { status: "accepted" },
            { new: true }
        );

        if (!requestUpdate) {
            return res.status(404).json({ error: "Request not found" });
        }

        res.status(200).json({
            message: "Request accepted successfully",
            notification: updatedNotification,
            request: requestUpdate,
        });
    } catch (error) {
        console.error("Error accepting notification:", error);
        res.status(500).json({ error: "Error accepting notification" });
    }
});

router.post("/api/reject-request", authenticateToken, async (req, res) => {
    const { senderID } = req.body;
    const receiverID = req.user;
    console.log("notification ids ", senderID, receiverID);

    try {
        const updatedNotification = await NotificationModel.findOneAndUpdate(
            {
                sender: senderID,
                receiver: receiverID,
                status: "pending",
            },
            { status: "rejected" },
            { new: true }
        );

        const requestUpdate = await RequestModel.findOneAndUpdate(
            {
                sender: senderID,
                receiver: receiverID,
            },
            { status: "rejected" },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        res.status(200).json({
            message: "Request Rejected ...! ",
            notification: updatedNotification,
            request: requestUpdate,
        });
    } catch (error) {
        console.error("Error rejecting notification:", error);
        res.status(500).json({ error: "Error rejecting notification" });
    }
});

module.exports = router;
