const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number, 
        required: true,
        default: 1,
    },
    price: {
        type: String,
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;
