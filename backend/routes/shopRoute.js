const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const routes = express.Router();
const Product = require("../models/productModel");

routes.post("/add-product", fileUpload(), (req, res) => {
	const images = req.files.images; // one value is an object and multiple value are array
	const product = JSON.parse(req.body.product);
	const time = new Date().getTime();

	if (images.length) {
		// more images
	} else {
		// one image
		const fileName = `${time}${images.name}`;
		const filePath = path.join(__dirname, `../uploads/images/${fileName}`);
		let ads = { images: [fileName], ...product };

		images.mv(filePath, async (err) => {
			err && res.status(500).send("Error on upload image");

			await Product.create(ads);
			res.send("Successfully uploaded your product");
		});
	}
});

routes.get("/get-my-ads/:userId", (req, res) => {
	const id = req.params.userId;

	Product.find({ userId: id }, (err, products) => {
		if (err) {
			res.status(405).send("Server error");
		}
		res.send(products);
	});
});

module.exports = routes;
