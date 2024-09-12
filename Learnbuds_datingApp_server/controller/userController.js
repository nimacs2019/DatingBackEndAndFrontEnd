const User = require("../database/dating_models/userDataSchema");

const getUserData = async (req, res) => {
    const { id } = req.params;
    const userId = id;

    try {
        const user = await User.find({ userId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
        // console.log(".........Sender Details.....", user);
    } catch (err) {
        // console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const recordViewedMyProfile = async (req, res) => {
    const { viewedUserId } = req.body;
    const loggedInUserId = req.user; // Assuming you have authentication middleware that sets req.user

    try {
        console.log("Viewed User ID:", viewedUserId);
        console.log("Logged-In User ID:", loggedInUserId);

        // Find the user whose profile is being viewed and update the viewedMyProfile array
        const updateResult = await User.updateOne(
            { userId: viewedUserId },
            { $addToSet: { viewedMyProfile: loggedInUserId } }
        );

        // Check if the user was found and updated
        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found or profile view already recorded" });
        }

        res.status(200).json({ message: "Profile view recorded successfully" });
    } catch (error) {
        console.error("Error recording profile view:", error); 
        res.status(500).json({ message: "Error recording profile view", error: error.message });
    }
};

const getViewedMyProfile = async (req, res) => {
    const loggedInUserId = req.user; // Assuming `req.user` contains the logged-in user's ID

    try {
        // Find the logged-in user's document and get the array of viewedMyProfile (list of userIds)
        const user = await User.findOne({ userId: loggedInUserId }).select('viewedMyProfile');

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if there are users who have viewed the profile
        const viewedProfileIds = user.viewedMyProfile || [];

        if (viewedProfileIds.length === 0) {
            return res.status(200).json({ message: "No one has viewed your profile yet", viewedProfiles: [] });
        }

        // Find the detailed profile information of the users who viewed the logged-in user's profile
        const viewedProfiles = await User.find({ userId: { $in: viewedProfileIds } })
            .select('name profilePicture location bio'); // You can customize the fields you want to return

        // Send the detailed user profiles as a response
        res.status(200).json({ viewedProfiles });
    } catch (error) {
        console.error("Error retrieving profile views:", error);
        res.status(500).json({ message: "Error retrieving profile views", error: error.message });
    }
};


module.exports = { getUserData, recordViewedMyProfile,getViewedMyProfile };
