const express = require("express");
const router = express.Router();
const NotificationModel = require("../database/dating_models/requestNotificationSchema");
const RequestModel = require("../database/dating_models/requestModel");
const User = require("../database/dating_models/userDataSchema");
const authenticateToken = require("../Middlewares/jwtAuth");

router.post("/api/accept-request", authenticateToken, async (req, res) => {
    const { notificationID } = req.body;

    try {
        const updatedNotification = await NotificationModel.findByIdAndUpdate(
            notificationID,
            { status: "accepted" },
            { new: true }
        );
        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        let requestUpdate;
        requestUpdate = await RequestModel.findOneAndUpdate(
            { sender: updatedNotification.sender, receiver: updatedNotification.receiver, request: requestUpdate },
            { status: "accepted" },
            { new: true }
        );
        if (!requestUpdate) {
            return res.status(404).json({ error: "Request not found" });
        }

        res.status(200).json({
            message: "Notification accepted successfully",
            notification: updatedNotification,
            request: requestUpdate,
        });
    } catch (error) {
        console.error("Error accepting notification:", error);
        res.status(500).json({ error: "Error accepting notification" });
    }
});

router.post("/api/reject-request", authenticateToken, async (req, res) => {
    const { notificationID } = req.body;

    try {
        const updatedNotification = await NotificationModel.findByIdAndUpdate(
            notificationID,
            { status: "rejected" },
            { new: true }
        );

        const requestUpdate = await RequestModel.findOneAndUpdate(
            { sender: updatedNotification.sender, receiver: updatedNotification.receiver },
            { status: "rejected" },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        res.status(200).json({ message: "Notification rejected", notification: updatedNotification });
    } catch (error) {
        console.error("Error accepting notification:", error);
        res.status(500).json({ error: "Error accepting notification" });
    }
});

module.exports = router;
