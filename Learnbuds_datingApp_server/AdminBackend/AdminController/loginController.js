const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [{ email: "admin@gmail.com", password: bcrypt.hashSync("admin", 10) }];

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Email and password',email, password);
    try {
        const user = users.find((user) => user.email === email);
        if (!user) {
            console.log("Invalid User Details");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (matchPassword) {
            const token = jwt.sign({ userEmail: user.email,isAdmin: true }, process.env.SECRET_KEY_ADMIN, { expiresIn: "1d" });

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
            res.cookie("userEmail", user.email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            res.status(200).json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


const logout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    res.clearCookie("userEmail", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
};

module.exports = { login, logout };
