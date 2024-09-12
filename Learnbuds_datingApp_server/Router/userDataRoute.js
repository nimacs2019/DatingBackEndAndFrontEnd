const express = require("express");
const { getUserData, recordViewedMyProfile ,getViewedMyProfile} = require("../controller/userController");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");

// GET user details by ID

router.get("/api/user-details/:id", authenticateToken, getUserData);
router.post("/api/user/record-viewProfile", authenticateToken, recordViewedMyProfile);
router.get("/api/view-profile", authenticateToken, getViewedMyProfile);
module.exports = router;
