const express = require("express");
const { addMessage, getMessages } = require("../controller/messageController");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwtAuth");


router.post("/", authenticateToken, addMessage);
router.get("/:chatId", authenticateToken, getMessages);

module.exports = router;
