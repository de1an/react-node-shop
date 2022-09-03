const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	price: { type: Number },
	images: { type: Array },
	userId: { type: String }
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
