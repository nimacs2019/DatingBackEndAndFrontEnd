const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("./database/dbConnection");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const authenticateToken = require("./Middlewares/jwtAuth");
const otpRouter = require("./Middlewares/twilioOtp");
const userRouter = require("./Router/userRegister");
const googleAuth = require("./Router/googleAuth");
const loginRouter = require("./Router/login");
const employmentRouter = require("./Router/employementRouter");
const relationshipTypeRouter = require("./Router/relationshipType");
const genderPreferenceRouter = require("./Router/genderPreference");
const myProfileRouter = require("./Router/myProfile");
const userDashboardRouter = require("./Router/userDashboard");
const selectedUserDetailsRouter = require("./Router/userDataRoute.js");
const addToShortlistRouter = require("./Router/shortlisted");
const viewShortlistedUsersRouter = require("./Router/viewShortListedUsers");
const viewShortlistedByUsersRouter = require("./Router/viewShortlistedByUsers");
const requestSentRouter = require("./Router/requestSent");
const viewRequestSentRouter = require("./Router/viewRequestSentUsers");
const requestNotificationRouter = require("./Router/requestNotification");
const acceptRequestRouter = require("./Router/acceptOrRequest");
const viewRequestAcceptedRouter = require("./Router/viewRequestAcceptedUsers");
const viewRequestRejectedRouter = require("./Router/viewRequestRejectedUsers");
const viewRequestReceivedRouter = require("./Router/viewRequestReceivedUsers");
const chatRouter = require("./Router/chatRouter.js");
const messageRouter = require("./Router/messageRoutr.js");
const editProfileRouter = require("./Router/editProfile");
const hideUserRoute = require("./Router/hideUser.js");
const productsRoutes = require("./Router/ecomRoutes/productsRoutes.js");
const cartRoutes = require("./Router/ecomRoutes/cartRoutes.js");
const checkoutRoutes = require("./Router/ecomRoutes/checkoutRoute.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
});
const PORT = process.env.PORT || 8080;

// enable connection with frontent data
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,PUT,POST,DELETE,PATCH",
        credentials: true,
    })
);
// set up session
app.use(
    session({
        secret: "OneNotOne",
        resave: false,
        saveUninitialized: true,
    })
);

// setUp passport
app.use(passport.initialize());
app.use(passport.session());

// to parse the json data
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", otpRouter);
app.use("/", googleAuth);
app.use("/", userRouter);
app.use("/", employmentRouter);
app.use("/", relationshipTypeRouter);
app.use("/", genderPreferenceRouter);
app.use("/", loginRouter);
app.use("/", myProfileRouter);
app.use("/", userDashboardRouter);
app.use("/", selectedUserDetailsRouter);
app.use("/", addToShortlistRouter);
app.use("/", viewShortlistedUsersRouter);
app.use("/", requestSentRouter);
app.use("/", viewRequestSentRouter);
app.use("/", requestNotificationRouter);
app.use("/", acceptRequestRouter);
app.use("/", viewRequestAcceptedRouter);
app.use("/", viewRequestRejectedRouter);
app.use("/", viewShortlistedByUsersRouter);
app.use("/", viewRequestReceivedRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/", editProfileRouter);
app.use("/", hideUserRoute);
app.use("/", productsRoutes);
app.use("/", cartRoutes);
app.use("/", checkoutRoutes);

// Protect a route with the authentication middleware
app.get("/protected", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access to protected route", user: req.user });
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("sendMessage", (messageData) => {
        io.emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// server started at 3000
server.listen(PORT, () => {
    console.log(`server connected on port number:  ${PORT}`);
});
