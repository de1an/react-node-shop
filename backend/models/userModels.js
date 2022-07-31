const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: Boolean },
	password: { type: String, required: Boolean },
	email: { type: String, required: Boolean },
	firstName: { type: String },
	lastName: { type: String },
	gender: { type: String },
	address: { type: String },
	postCode: { type: String },
	city: { type: String },
	isAdmin: { type: Boolean, default: false }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
