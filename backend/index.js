const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const DB = require("./dbConfig/dbConfig");
const connectDB = require('./dbConfig/connectDB');
const Users = require("./models/userModels");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// * database connection
connectDB();

// user login
app.post("/api/login", (req, res) => {
  const reqBody = req.body;

  Users.findOne(reqBody, (err, user) => {
    if (err) {
      res.status(401).send("An error has occurred");
      return;
    }
    if (user) res.send(user)
    else res.status(400).send("Failed login");
  })
});

// user register
app.post("/api/register", (req, res) => {
  const reqBody = req.body;
  
  Users.find({email : reqBody.email}, async (err, user) => {
    if (err) {
      res.status(401).send("An error has occurred");
      return;
    }
    if (user && user.length) res.status(402).send("User is already registered");
    else {
      const newUser = new Users(reqBody);
      await newUser.save(newUser);
      res.send("User is registered");
    }
  })  
})









app.listen(DB.port, (err) => {
  err ? console.log(err) : console.log("Server is running on port 4000");
  console.log(DB.link);
});
