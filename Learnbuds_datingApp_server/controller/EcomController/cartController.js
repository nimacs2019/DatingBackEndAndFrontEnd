const CartItem = require("../../database/ecom_models/Cart");

const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;

        const cartItems = await CartItem.find({ userId }).populate("productId");

        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Error fetching cart items", error: error.message });
    }
};

const addToCart = async (req, res) => {
    const { productId, quantity, price, name } = req.body;

    const userId = req.user._id;

    if (!productId || !quantity || !price || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const existingCartItem = await CartItem.findOne({ productId, userId });
        console.log("Existing cart item:", existingCartItem);

        if (existingCartItem) {
            return res.status(400).json({ message: "Product is already in the cart" });
        } else {
            const newCartItem = new CartItem({
                userId,
                productId,
                name,
                quantity,
                price,
            });

            console.log("New cart item to be saved:", newCartItem);
            const savedCartItem = await newCartItem.save();
            console.log("Saved cart item:", savedCartItem);
            res.status(201).json(savedCartItem);
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    try {
        const updatedCartItem = await CartItem.findByIdAndUpdate(itemId, { quantity }, { new: true, runValidators: true });

        if (!updatedCartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.status(200).json(updatedCartItem);
        console.log("updated details", updatedCartItem);
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ error: "Error updating cart item quantity" });
    }
};

const deleteCartItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        const deletedCartItem = await CartItem.findByIdAndDelete(itemId);

        if (!deletedCartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ error: "Error deleting cart item" });
    }
};

module.exports = { addToCart, getCartItems, updateCartItem, deleteCartItem };
