const DeliveryAddress = require("../../database/ecom_models/DeliveryAddress");

const getUserAddress = async (req, res) => {
    const userId = req.user;
    try {
        const userAddress = await DeliveryAddress.findOne({ userId }).populate("firstName");
        if (!userAddress) {
            return res.status(404).json({ message: "No address found for this user" });
        }
        res.status(200).json(userAddress);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

const addUserAddress = async (req, res) => {
    const userId = req.user;
    const { firstName, address, city, state, pinCode, phoneNumber } = req.body;

    if (!firstName || !address || !city || !state || !pinCode || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingAddress = await DeliveryAddress.findOne({ userId });
        console.log("Address...:", existingAddress);

        if (existingAddress) {
            return res.status(400).json({ message: "Address has already been added" });
        } else {
            const newAddress = new DeliveryAddress({
                userId: user,
                firstName,
                address,
                city,
                state,
                pinCode,
                phoneNumber,
            });

            await newAddress.save();

            res.status(201).json({ message: "Address added successfully", address: newAddress });
        }
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Failed to add address", error: error.message });
    }
};

const editAddress = async (req, res) => {
    const userId = req.user;
    const { firstName, address, city, state, pinCode, phoneNumber } = req.body;

    if (!firstName || !address || !city || !state || !pinCode || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const updatedAddress = await DeliveryAddress.findOneAndUpdate(
            { userId },
            { firstName, address, city, state, pinCode, phoneNumber },
            { new: true } 
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found for the user" });
        }

        res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getUserAddress, addUserAddress,editAddress };
