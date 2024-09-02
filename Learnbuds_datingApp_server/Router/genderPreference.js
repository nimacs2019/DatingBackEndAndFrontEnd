const router = require("express").Router();
const authenticateToken = require("../Middlewares/jwtAuth");
const User = require("../database/dating_models/userSchema");

router.post("/api/gender-preference", authenticateToken, async (req, res) => {
    const {genderPreference} = req.body
    if (!genderPreference) {
        return res.status(400).json({ success: false, message: "Gender Preference is required" });
    }
    try {
        if (genderPreference ) {
           
            res.status(200).json({ success: true, message: "Gender Preference processed successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid " });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }

});
module.exports = router;
