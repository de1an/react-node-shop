const express = require("express");
const path = require("path");
const routes = express.Router();
const Product = require("../models/productModel");
const fs = require("fs");

routes.delete("/delete-ad/:id", (req, res) => {
	let {id} = req.params;
	let product = null;
	
	Product.findById(id, async (err, data) => {
		if (err) res.status(421).send("Error, please try later");
		if(!data) res.status(420).send("Product with that id doesn't exist")
		else {
			product = data;
			let filePath = path.join(__dirname, `../uploads/images/`)

			try {
				product.images.forEach(img => {
					fs.unlinkSync(filePath + img)
				});
			} catch (error) {
				console.log(error);
			}
			await product.remove();
			res.send("Successfully deleted your ad")
		}
	})
});

routes.get("/get-all-ads", (req, res) => {
	Product.find({}, (err, products) => {
		if (err) res.status(501).send("Something went wrong");
		(products.length) ? res.send(products) : res.status(400).send("Products don't exists");
	});
});

routes.get("/get-single-ad/:id", (req, res) => {
	const { id } = req.params;

	Product.findOne({ _id: id }, (err, data) => {
		if (err) res.status(500).send("Error");
		data
			? res.send(data)
			: res.status(400).send("The product doesn't exist");
	});
});

routes.put("/edit-product", (req, res) => {
	const product = JSON.parse(req.body.product);
	let newImages = req.files?.newImages;
	let savedImages = [];
	const arrayOfNewImages = [];
	const filePath = path.join(__dirname, `../uploads/images/`);

	if(product.deleteImages.length){
		savedImages = product.images.filter(item => {
			if(!product.deleteImages.includes(item)){
				return item;
			}
		})
		product.deleteImages.forEach(img => {
			fs.unlinkSync(filePath + img);
		});
		
	} else {
		savedImages = [...product.images];
	}
	delete product.deleteImages;

	if(newImages === undefined){
		// no images
	} else if(newImages.length){
		newImages.forEach(item => {
			let fileName = `${new Date().getTime()}${item.name}`;
			let imgPath = filePath + fileName;
			item.mv(imgPath , err => {
				err && res.status(500).send("Error on upload image");
			})
			arrayOfNewImages.push(fileName);
		})
	} else {
		let fileName = `${new Date().getTime()}${newImages.name}`;
		let imgPath = filePath + fileName;
		newImages.mv(imgPath ,err => {
			err && res.status(500).send("Error on upload image");
		})
		arrayOfNewImages.push(fileName);
	}

	let images = [...savedImages, ...arrayOfNewImages];
	product.price = parseInt(product.price);
	product.images = [...images];
	

	Product.updateOne({_id: product._id, userId: product.userId}, product, (err, result) => {
		if(err) res.status(500).send("Currentlly not possible to update your ad.");
		result.modifiedCount === 1 ? 
			res.send("You successfully updated your ad.") :
			res.status(401).send("Update failed.");
	})

})

routes.post("/add-product", async (req, res) => {
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
		arrayOfImagesNames.push(fileName);

		image.mv(filePath, (err) => {
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
