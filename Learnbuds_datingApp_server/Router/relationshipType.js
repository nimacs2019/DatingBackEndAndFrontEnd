const router = require("express").Router();
const authenticateToken = require("../Middlewares/jwtAuth");
const User = require("../database/dating_models/userSchema");


router.post("/api/relationship-Duration", authenticateToken, async (req, res) => {
    console.log("relationship type request body", req.body);
    const { relationshipType } = req.body;
    if (!relationshipType) {
        return res.status(400).json({ success: false, message: "Relationship type is required" });
    }
    try {
        if (relationshipType === "short-term") {
           
            res.status(200).json({ success: true, message: "Short-term relationship type processed successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid relationship type" });
        }
    } catch (error) {
        console.error("Error processing relationship type:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
