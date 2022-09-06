const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const routes = express.Router();
const Product = require("../models/productModel");

routes.get("/get-all-ads", (req, res) => {
	Product.find({}, (err, products) => {
		if(err) res.status(501).send("Something went wrong");
		products ? res.send(products) : res.status(400).send("Products don't exists");
	})
})

routes.post("/add-product", fileUpload(), async (req, res) => {
	const userImages = req.files.images; // one value is an object and multiple value are array
	const userProduct = JSON.parse(req.body.product);
	let arrayOfImages = null;
	const arrayOfImagesNames = [];

	if (!userImages.length) {
		arrayOfImages = [];
		arrayOfImages[0] = userImages;
	} else arrayOfImages = [...userImages];

	arrayOfImages.forEach((image) => {
		let time = new Date().getTime();
		let fileName = `${time}${image.name}`;
		let filePath = path.join(__dirname, `../uploads/images/${fileName}`);
		arrayOfImagesNames.push(fileName)

		image.mv(filePath, err => {
			err && res.status(500).send("Error on upload image");
		});
		
	});
	let ads = { images: arrayOfImagesNames, ...userProduct };
	await Product.create(ads);
	res.send("OK");
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
