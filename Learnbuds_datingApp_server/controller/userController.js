const User = require("../database/dating_models/userDataSchema");

const getUserData = async (req, res) => {
    console.log("Request received");
    const { id } = req.params;
    const userId = id;
    console.log("User ID:", id);

    try {
        const user = await User.find({ userId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
        console.log(".........Sender Details.....", user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = { getUserData };
