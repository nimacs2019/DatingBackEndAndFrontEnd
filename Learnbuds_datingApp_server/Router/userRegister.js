const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/multer");
const bcrypt = require("bcrypt");
const path = require('path');
const User = require("../database/dating_models/userSchema");
const UserData = require("../database/dating_models/userDataSchema");
const authenticateToken = require("../Middlewares/jwtAuth");

router.post(
    "/api/registration",
    authenticateToken,
    upload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "moreImages", maxCount: 5 },
        { name: "reels", maxCount: 1 },
    ]),
    async (req, res) => {
        console.log("User entered details:", req.body);
        console.log("User entered Image files:", req.files);
        console.log("User id", req.user);
        const { _id } = req.user;

        const {
            name,
            email,
            mob,
            password,
            confirmPassword,
            dob,
            age,
            gender,
            dist,
            hobbies,
            interests,
            smokingHabits,
            drinkingHabits,
            qualification,
            job,
        } = req.body;

        try {
            let user = await User.findOne({ $or: [{ email }, { mob }] });

            if (user) {
                user.displayName = name;
                user.mob = mob;
                user.email = email;

                if (password) {
                    user.password = await bcrypt.hash(password, 10);
                }

                console.log("Updated Details:", user.displayName, user.mob, user.email, user.password);
                await user.save();

                const userData = {
                    userId: _id,
                    name,
                    email,
                    mob,
                    password: await bcrypt.hash(password, 10),
                    confirmPassword: await bcrypt.hash(password, 10),
                    dob,
                    age,
                    gender,
                    dist,
                    hobbies,
                    interests,
                    smokingHabits,
                    drinkingHabits,
                    qualification,
                    job,
                };

                if (req.files.profilePicture) {
                    userData.profilePicture = path.relative(__dirname,req.files.profilePicture[0].path);
                }
                if (req.files.moreImages) {
                    userData.moreImages = req.files.moreImages.map((file) => path.relative(__dirname, file.path));
                }
                if (req.files.reels) {
                    userData.reels = path.relative(__dirname, req.files.reels[0].path);
                }

                const newUser = new UserData(userData);
                await newUser.save();
                return res.status(201).json(newUser);
            } else {
                return res.status(404).json({ message: "User does not exist" });
            }
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
