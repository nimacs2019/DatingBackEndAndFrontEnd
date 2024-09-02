const express = require("express");
const router = express.Router();
const shortListModel = require("../database/dating_models/shortListModel");
const authenticateToken = require("../Middlewares/jwtAuth");

router.post("/shortList", authenticateToken, async (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user; 
    console.log("Sender id",senderId);

    try {
        const existingRequest = await shortListModel.findOne({ shortListedBy: senderId, shortListed: receiverId });

        if (existingRequest) {
            return res.status(400).json({ message: "Already shortlisted" });
        }

        const newRequest = new shortListModel({
            shortListedBy: senderId,
            shortListed: receiverId,
        });

        await newRequest.save();

        res.status(201).json({ message: "Shortlisted......!" });
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
