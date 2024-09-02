const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = 8001;

// CORS configuration
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,PUT,POST,DELETE,PATCH",
        credentials: true,
    })
);

// Session configuration
app.use(
    session({
        secret: "OneNotOne",
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Import Admin Routes
const loginRoutes = require("./AdminBackend/AdminRoutes/loginRoutes");
const checkAuthRoutes = require('./AdminBackend/AdminRoutes/checkAuth')
const authenticateAdmin = require("./AdminBackend/AdminMiddleware/authenticateAdmin");

app.use("/", loginRoutes);
app.use("/", checkAuthRoutes);


app.get("/api/admin/data", authenticateAdmin, (req, res) => {
    res.send("Admin data");
});

// Start server
app.listen(PORT, () => {
    console.log(`Admin server connected on port number: ${PORT}`);
});
