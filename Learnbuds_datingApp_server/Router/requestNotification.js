const express = require("express");
const router = express.Router();
const NotificationModel = require("../database/dating_models/requestNotificationSchema");
const User = require("../database/dating_models/userDataSchema");
const authenticateToken = require("../Middlewares/jwtAuth");

router.get("/api/req-notifications", authenticateToken, async (req, res) => {
    console.log("Fetching notifications...");
    const receiver = req.user
    console.log( receiver);

    try {
        const notifications = await NotificationModel.find({ receiver}).populate("sender", "name");

        if (notifications.length === 0) {
            return res.status(204).json({ message: "No notifications found for this user" });
        }

        const notificationsWithSenderDetails = await Promise.all(
            notifications.map(async (notification) => {
                try {
                    const sender = await User.findOne({userId : notification.sender});
                    if (!sender) {
                        console.log("Sender not found for notification:", notification._id);
                    } else {
                        console.log("Sender found:", sender);
                    }
                    return { ...notification._doc, sender };
                } catch (error) {
                    console.error("Error fetching sender details:", error);
                    return { ...notification._doc, sender: null }; // Handle error case
                }
            })
        );

        res.json(notificationsWithSenderDetails);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Error fetching notifications" });
    }
});


module.exports = router;




































