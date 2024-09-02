const Product = require("../../database/ecom_models/Products");

const getProducts = async (req, res) => {
    console.log("...........", req.user);
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send("Server Error");
    }
};

const addProducts = async (req, res) => {
    const { name, price, img, category } = req.body;

    if (!name || !price || !img || !description || !category) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    const newProduct = new Product({ name, price, img, category });

    try {
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).send("Server Error");
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const product = await Product.findById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { getProducts, addProducts, getProductById };
