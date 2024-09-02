const express = require("express");
const router = express.Router();
const authenticateToken = require("../../Middlewares/jwtAuth");

const { getProducts, addProducts, getProductById } = require("../../controller/EcomController/productController");

router.get("/api/products", authenticateToken, getProducts);
router.post("/api/add-product", authenticateToken, addProducts);
router.get("/api/products/:id", authenticateToken, getProductById);

module.exports = router;
