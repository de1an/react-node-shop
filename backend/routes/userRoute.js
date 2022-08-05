const express = require('express');
const Users = require("../models/userModels");
const mailer = require("../configMail/mailer");
const routes = express.Router();


// login
routes.post("/login", (req, res) => {
  const reqBody = req.body;

  Users.findOne(reqBody, (err, user) => {
    if (err) {
      res.status(401).send("An error has occurred");
      return;
    }
    if (user) res.send(user)
    else res.status(400).send("Failed login");
  })
})

// register
routes.post("/register", (req, res) => {
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
      mailer(newUser);
      res.send("User is registered, please check out your email");
    }
  })  
})

// complete register
routes.patch("/complete-registration", (req, res) => {
  const id = req.body.id;

  Users.findByIdAndUpdate(id, {isActive: true}, (err, data) => {
    if(err) {
      res.status(401).send("User with that id not-exists");
      return;
    }
    res.send(data);
  })
})

module.exports = routes;