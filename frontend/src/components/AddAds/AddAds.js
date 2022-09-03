import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import ShopService from "../../services/ShopService";
import "./addAds.scss";

function AddAds({ closePopup }) {
	const [images, setImages] = useState(null);
	const [userProduct, setUserProduct] = useState({
		title: "",
		description: "",
		price: "",
		userId: JSON.parse(localStorage.getItem("user"))._id,
	});

	const onHandleSubmit = (e) => {
		e.preventDefault();
		for (const prop in userProduct) {
			if (!userProduct[prop] || images.length === 0) {
				toast.error(
					"You must fill all fields before publish your product."
				);
				return;
			}
		}
		const formData = new FormData();
		formData.append("product", JSON.stringify(userProduct));
		
		for (const key in images) {
			formData.append("images", images[key])
		}

		ShopService.addProduct(formData)
			.then((res) => {
				if (res.status === 200) {
					toast.success("You successfully add your product to our site.", {autoClose: 2000,})
					setTimeout(() => {
						window.location.reload();
					}, 3000)
				}
			})
			.catch((err) => {
					toast.error("Something went wrong, please try again later.", {autoClose: 2000})
			})
	};

	const onHandleInput = (e) => {
		let product = { ...userProduct };
		product[e.target.name] = e.target.value;
		setUserProduct(product);
	};

	const onHandleFile = (e) => {
		const userImages = { ...e.target.files };
		setImages(userImages);
	};

	return (
		<>
			<div className="popup-container">
				<div className="popup">
					<AiOutlineClose
						className="float-end close-icon"
						onClick={closePopup}
					/>
					<h4>Add new product</h4>

					<form
						className="my-3"
						encType="multipart/form-data"
						onSubmit={onHandleSubmit}
					>
						<label htmlFor="title">Product name</label>
						<input
							onInput={onHandleInput}
							type="text"
							name="title"
							className="form-control mb-3"
						/>
						<label htmlFor="title">Product description</label>
						<input
							onInput={onHandleInput}
							type="text"
							name="description"
							className="form-control mb-3"
						/>
						<label htmlFor="title">Product price</label>
						<input
							onInput={onHandleInput}
							type="number"
							name="price"
							className="form-control mb-3"
						/>
						<label htmlFor="images">Add images</label>
						<input
							onInput={onHandleFile}
							type="file"
							multiple
							name="images"
							id="images"
							className="form-control mb-5"
						/>
						<button className="primary-btn">
							Publish your product
						</button>
					</form>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export default AddAds;
