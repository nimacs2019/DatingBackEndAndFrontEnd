const express = require("express");
const router = express.Router();
const User = require("../database/dating_models/userDataSchema");
const authenticateToken = require("../Middlewares/jwtAuth");

router.post('/api/do-not-show', authenticateToken, async (req, res) => {
    const { hide_Id } = req.body;
    const userId = req.user; 

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    if (!hide_Id) {
        return res.status(400).json({ error: 'Hide ID is required' });
    }
    
    try {
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!Array.isArray(user.doNotShow)) {
            user.doNotShow = [];
        }

        if (!user.doNotShow.includes(hide_Id)) {
            user.doNotShow.push(hide_Id);
            await user.save();
        }

        res.status(200).json({ message: 'User hidden successfully' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
