const express = require("express");
const User = require("../database/dating_models/userDataSchema");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");

// Get all users
// router.get("/api/user-details", authenticateToken, async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });


router.get("/api/user-details", authenticateToken, async (req, res) => {
    const { userId } = req.user
    try {
        const loggedInUser = await User.findOne(userId); // Assuming req.user.id contains the logged-in user's ID
        
        if (!loggedInUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch users excluding those in the logged-in user's donotshow list
        const users = await User.find({
            userId: { $nin: loggedInUser.donotshow }
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
