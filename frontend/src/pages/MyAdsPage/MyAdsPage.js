import React, { useState, useEffect } from "react";
import AddAds from "../../components/AddAds/AddAds";
import MyAd from "../../components/MyAd.js/MyAd";
import ShopService from "../../services/ShopService";
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onHandleClick = () => {
		setIsBtnActive((prevState) => !prevState);
	};
	return (
		<>
			<div className="container my-3 px-0">
				<button className="primary-btn mb-5" onClick={onHandleClick}>
					Add new products
				</button>
				<div className="row">
					{isApiError && (<p>We are currently unable to show you you products.</p>)}

					{myProducts.map((product, index) => {
						return <MyAd product={product} key={index} />;
					})}
				</div>
			</div>
			{isBtnActive ? <AddAds closePopup={onHandleClick} /> : null}
		</>
	);
}

export default MyAdsPage;
