// import mongoose
const mongoose = require("mongoose");

// For connection String
mongoose
    .connect("mongodb://localhost:27017/MernLoginGoogle", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongodb connected successfully.....");
    })
    .catch((err) => {
        console.log(err);
    });
