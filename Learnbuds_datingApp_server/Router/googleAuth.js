const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkUserType } = require("../Middlewares/passportGoogleAuth");
require("../Middlewares/passportGoogleAuth");
const jwt = require("jsonwebtoken");

// initial google auth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// login
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
    }),
    async (req, res, next) => {
        try {
            const user = req.user;
            // Generate JWT Token
            const token = jwt.sign({ userid: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1d" });

            if (!token) {
                return res.status(404).json({ message: "Token not found" });
            }

            // console.log("Setting cookies for user:", user);
            // console.log("Generated Token:", token);

            // Set the JWT token in a cookie
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
            res.cookie("userid", user._id.toString(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            res.cookie("jwt", token);

            if (req.user) {
                // Redirect new user to the registration page
                return res.redirect("http://localhost:3000/userhome");
            }
        } catch (error) {
            res.redirect("http://localhost:3000/login");
        }
    }
);

module.exports = router;
