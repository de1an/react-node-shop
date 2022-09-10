import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShopService from "../../services/ShopService";
import { toast, ToastContainer } from "react-toastify";
import ViewAd from "../../components/ViewAd.js/ViewAd";
import {routerConfig} from "../../config/routerConfig";

function SingleAdPage() {
	const { id } = useParams();
	const [ad, setAd] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		ShopService.getSingleAd(id)
			.then((res) => {
				if (res.status === 200) {
					setAd(res.data);
				}
			})
			.catch((err) => {
				toast.error("Something went wrong. Try again later.", {
					autoClose: 2000,
				});
				setTimeout(() => {
					navigate(routerConfig.SHOP.url);
				}, 2000)
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
			<div className="container my-5">
				<ViewAd ad={ad}/>
			</div>
			<ToastContainer />
		</>
	);
}

export default SingleAdPage;
