const express = require("express");
const Users = require("../models/userModels");
const mailer = require("../configMail/mailer");
const bcrypt = require("bcrypt");
const routes = express.Router();

const salt = parseInt(process.env.SALT_ROUNDS);

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
	let password = "";

	Users.findByIdAndUpdate(id, { isActive: true }, (err, data) => {
		if (err) {
			res.status(401).send("User with that id not-exists");
			return;
		}
		res.send(data);
	});
});

// update user info
routes.patch("/update-profile", async (req, res) => {
	const reqBody = req.body;

	let user = await Users.findById(reqBody.id).exec();

	if (reqBody.email !== user.email) {
		Users.findOne({email: reqBody.email}, (err, user) => {
			if(err) return res.status(401).send("Server error");
			if(user) return res.status(401).send("User with that email already exist.");
		})
	}
	Users.findByIdAndUpdate(
		reqBody.id,
		{$set: {
			username: reqBody.username,
			email: reqBody.email,
			gender: reqBody.gender,
			address: reqBody.address,
			city: reqBody.city
			}
		},
		{ new: true },
		(err, docs) => {
			if(err) return res.status(401).send("Currently not possible to update");
			res.send(docs)
		})
})

// change password
routes.patch("/change-password", async (req, res) => {
	const reqBody = req.body;

	let user = await Users.findById(reqBody.id).exec();
	
	bcrypt.compare(reqBody.oldPassword, user.password, (err, result) => {
		if (err) return res.status(400).send("Server error");
		if(!result) return res.status(401).send("Password doesn't match.");

		bcrypt.hash(reqBody.newPassword, salt, (err, hash) => {
			Users.updateOne({_id: reqBody.id}, {$set: {password: hash}}, (err, data) => {
				if (err) return res.status(401).send("An error has occurred");
				res.send("Successfully updated your password.")
			})
		})
		});
})


module.exports = routes;
