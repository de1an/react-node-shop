import React, { useState, useEffect } from "react";
import AddAds from "../../components/AddAds/AddAds";
import MyAd from "../../components/MyAd.js/MyAd";
import ShopService from "../../services/ShopService";
import {toast, ToastContainer} from "react-toastify";
import "./myAdsPage.scss";

function MyAdsPage() {
	const [isBtnActive, setIsBtnActive] = useState(false);
	const [myProducts, setMyProducts] = useState([]);
	const [isApiError, setIsApiError] = useState(false);

	const userId = JSON.parse(localStorage.getItem("user"))._id;

	useEffect(() => {
		ShopService.getMyAds(userId)
			.then((res) => {
				if (res.status === 200) {
					setMyProducts(res.data);
				}
			})
			.catch((err) => {
				setIsApiError(true);
			});
	}, [myProducts, userId]);

	const onHandleClick = () => {
		setIsBtnActive((prevState) => !prevState);
	};

	const deleteProduct = (id) => {
		ShopService.deleteAd(id).then((res) => {
			if (res.status === 200) {
				toast.success(res.data, {autoClose: 3000})
			}
		}).catch((err) => {
			if(err) toast.error(err.response.data, {autoClose: 3000})
		});
	};

	return (
		<>
			<div className="container my-3 px-0">
				<button className="primary-btn mb-5" onClick={onHandleClick}>
					Add new products
				</button>
				<div className="row d-flex">
					{isApiError && (<p>We are currently unable to show you your products.</p>)}

					{myProducts.map((product, index) => {
						return <MyAd product={product} key={index} deleteProduct={deleteProduct}/>;
					})}
				</div>
			</div>
			<ToastContainer />
			{isBtnActive ? <AddAds closePopup={onHandleClick} /> : null}
		</>
	);
}

export default MyAdsPage;
