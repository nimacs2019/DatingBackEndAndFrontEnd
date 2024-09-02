const express = require("express");
const { getUserData } = require("../controller/userController");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");

// GET user details by ID

router.get("/api/user-details/:id", getUserData, authenticateToken);
module.exports = router;
