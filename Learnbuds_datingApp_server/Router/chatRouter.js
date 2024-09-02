const express = require("express");
const { findChat, userChats, addToChatList } = require("../controller/chatController");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");

router.post("/", authenticateToken, addToChatList);
router.get("/:userId", authenticateToken, userChats);
router.get("/find/:firstId/:secondId", authenticateToken, findChat);

module.exports = router;
