import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductSlider from "../ProductSlider/ProductSlider";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "./viewAd.scss";
import ShopFunctions from "../../utilities/ShopFunctions";
import { toast, ToastContainer } from "react-toastify";

function ViewAd({ ad }) {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const onHandleQuantity = (e) => {
		if (e.target.value < 1) {
			setQuantity(1);
			return;
		}
		setQuantity(e.target.value);
	};

	const addToCartStore = () => {
		let copyAd = {...ad}
		copyAd.quantity = parseInt(quantity);
		copyAd.totalPrice =  parseInt(copyAd.quantity * copyAd.price);
		dispatch(addToCart(copyAd));
		toast.success("Successfully added to cart", {autoClose: 1500})
	}

	return (
		ad && (
			<div className="row single-ad d-flex align-items-center">
				<div className="col-md-6 slider-container">
					<ProductSlider images={ad.images} />
				</div>
				<div className="col-md-6 px-3 main-info">
					<h3 className="mb-3">{ad.title}</h3>
					<p className="mb-2">{ad.description}</p>
					<p className="mb-2 fw-bold fst-italic fs-3">
						Price:{" "}
						<span className="price">
							{ShopFunctions.calculatePrice(ad.price, quantity)}
						</span>
					</p>

					<p className="me-3 fw-bold fst-italic d-inline">
						Quantity:
					</p>
					<input
						type="number"
						className="quantity"
						defaultValue="1"
						min="1"
						onInput={onHandleQuantity}
					/>

					<button onClick={addToCartStore} className="primary-btn d-block mt-4">
						<span>
							<FaShoppingCart />
						</span>{" "}
						Add To Cart
					</button>
				</div>
				<ToastContainer />
			</div>
		)
	);
}

export default ViewAd;
