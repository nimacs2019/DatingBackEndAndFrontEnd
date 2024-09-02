const express = require("express");
const router = express.Router();
const authenticateToken = require("../../Middlewares/jwtAuth");

const { addToCart, getCartItems, updateCartItem,deleteCartItem } = require("../../controller/EcomController/cartController");

router.post("/api/cart", authenticateToken, addToCart);
router.get("/api/cart", authenticateToken, getCartItems);
router.patch("/api/cart/:itemId", authenticateToken, updateCartItem);
router.delete("/api/cart/:itemId", authenticateToken,deleteCartItem);

module.exports = router;
