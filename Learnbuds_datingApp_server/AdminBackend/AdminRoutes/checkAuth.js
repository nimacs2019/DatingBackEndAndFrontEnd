const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/api/check-auth', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.json({ isAuthenticated: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
        return res.json({ isAuthenticated: true, userEmail: decoded.userEmail });
    } catch (err) {
        return res.json({ isAuthenticated: false });
    }
});

module.exports = router;
