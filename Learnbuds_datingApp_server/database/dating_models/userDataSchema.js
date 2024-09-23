const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: String,
        email: String,
        mob: String,
        password: String,
        confirmPassword: String,
        dob: Date,
        age: String,
        gender: String,
        dist: String,
        hobbies: [String],
        interests: [String],
        smokingHabits: String,
        drinkingHabits: String,
        qualification: String,
        job: String,
        profilePicture: String,
        moreImages: [String],
        reels: [String],
        doNotShow: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        viewedMyProfile: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                viewedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const UserData = mongoose.model("userinformations", userDataSchema);

module.exports = UserData;
