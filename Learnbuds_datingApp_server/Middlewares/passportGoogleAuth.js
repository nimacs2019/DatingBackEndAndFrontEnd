const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require("../database/dating_models/userSchema");
require("dotenv").config();

// Setup Google authentication
passport.use(
    new OAuth2Strategy(
        {
            clientID: process.env.Client_ID,
            clientSecret: process.env.Client_Secret,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile);
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // Existing user - login
                    return done(null, user);
                } else {
                    // User does not exist - sign up
                    user = new User({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value,
                    });

                    await user.save();
                    user.isNewUser = true; // Set flag for new user
                    return done(null, user);
                }
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, { id: user.id, isNewUser: user.isNewUser }); // Save user ID and isNewUser flag to the session
});

passport.deserializeUser(async (obj, done) => {
    try {
        const user = await User.findById(obj.id);
        if (user) {
            user.isNewUser = obj.isNewUser; // Restore the isNewUser flag
            done(null, user);
        }
    } catch (err) {
        done(err, null);
    }
});
