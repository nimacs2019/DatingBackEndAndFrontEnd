const express = require("express");
const { login, logout } = require("../AdminController/loginController");
const router = express.Router();
const authenticateAdmin = require("../AdminMiddleware/authenticateAdmin");

router.post("/api/login", login);
router.post("/api/logout", logout);

module.exports = router;
