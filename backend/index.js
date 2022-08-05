const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const DB = require("./dbConfig/dbConfig");
const connectDB = require('./dbConfig/connectDB');
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// * database connection
connectDB();

// * user routes
app.use("/api/user", userRoute);










app.listen(DB.port, (err) => {
  err ? console.log(err) : console.log("Server is running on port 4000");
  console.log(DB.link);
});
