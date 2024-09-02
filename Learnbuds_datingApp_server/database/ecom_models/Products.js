const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
