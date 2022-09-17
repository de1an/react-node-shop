const express = require("express");
const Users = require("../models/userModels");
const mailer = require("../configMail/mailer");
const bcrypt = require("bcrypt")
const routes = express.Router();

// login
routes.post("/login", (req, res) => {
	const reqBody = req.body;

	Users.findOne({email: reqBody.email}, (err, user) => {
		if (err) {
			res.status(401).send("An error has occurred");
			return;
		}
		if (user) {
			bcrypt.compare(reqBody.password, user.password, (err, result) =>{
				if(!err) {
					result ? res.send(user) : res.status(400).send("Wrong password");
				} else res.status(400).send("Error");
			});
		} else res.status(401).send("The user doesn't exist")
	});
});

// register
routes.post("/register", (req, res) => {
	const reqBody = req.body;
	const salt = parseInt(process.env.SALT_ROUNDS);

	Users.find({ email: reqBody.email }, async (err, user) => {
		if (err) {
			res.status(401).send("An error has occurred");
			return;
		}
		if (user && user.length)
			res.status(402).send("User is already registered");
		else {
			bcrypt.hash(reqBody.password, salt, (err, hash) => {
				if (!err) {
					reqBody.password = hash;
					const newUser = new Users(reqBody);
					newUser.save();
					mailer(newUser);
					res.send("User is registered, please check out your email");
				} else console.log(err);
			})
		}
	});
});

// complete register
routes.patch("/complete-registration", (req, res) => {
	const id = req.body.id;

	Users.findByIdAndUpdate(id, { isActive: true }, (err, data) => {
		if (err) {
			res.status(401).send("User with that id not-exists");
			return;
		}
		res.send(data);
	});
});

module.exports = routes;
