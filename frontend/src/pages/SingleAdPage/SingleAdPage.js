import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopService from "../../services/ShopService";
import { toast, ToastContainer } from "react-toastify";
import ViewAd from "../../components/ViewAd.js/ViewAd";

function SingleAdPage() {
	const { id } = useParams();
	const [ad, setAd] = useState(null);

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
			});
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
