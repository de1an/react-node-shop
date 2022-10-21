import React, { useEffect, useState } from "react";
import ShopService from "../../services/ShopService";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "./shopPage.scss";
import ShopFunctions from "../../utilities/ShopFunctions";
import { routerConfig } from "../../config/routerConfig";
import { imageRoute } from "../../utilities/configUrl";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderSlice";
import Sort from "../../components/Sort/Sort";
import Search from "../../components/Seacrh/Search";

function ShopPage() {
	const [ads, setAds] = useState([]);
	const [isApiFinish, setIsApiFinish] = useState(false);
	const [isApiError, setIsApiError] = useState(false);
	const dispatch = useDispatch();
	const location = useLocation();
	const [query, setQuery] = useSearchParams();

	useEffect(() => {
    setIsApiError(false)
		if (!location.search) {
			getAllAds();
		} else {
			getAllSearched();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname, query, ads.length]);

	const getAllAds = () => {
		dispatch(showLoader(true));
		return ShopService.getAllAds()
			.then((res) => {
				if (res.status === 200) {
					setAds(res.data);
				}
			})
			.catch((err) => {
				setIsApiError(true);
			})
			.finally(() => {
				setIsApiFinish(true);
        dispatch(showLoader(false));
			})
	};

	const getAllSearched = () => {
		dispatch(showLoader(true));
		return ShopService.getAllSearched(query.get("q"))
			.then((res) => {
				if (res.status === 200) {
					setAds(res.data);
				}
			})
			.catch((err) => { 
        setIsApiError(err.response.data)
        setAds([])
      })
      .finally(() => {
        setIsApiFinish(true);
        dispatch(showLoader(false))
      });
	};
	const sort = (ads) => {
		setAds([...ads]);
	};

	const productsLayout = () => {
		return (
			<section className="row my-5">
				<aside className="col-md-2">
					<Search />
					<Sort ads={ads} setSortedAds={sort} getAllAds={getAllAds} />
				</aside>
				<main className="col-md-10 row">
					{ads.map((ad, index) => {
						return (
							<div className="ad-cart col-md-4 mb-4" key={index}>
								<div>
									<img
										src={`${imageRoute}${ad.images[0]}`}
										alt=""
										className="img-fluid  d-block mx-auto"
									/>
								</div>
								<div className="p-3">
									<h2 className="fw-bold">{ad.title}</h2>
									<p className="my-3">
										{ad.description.slice(0, 140)}...
									</p>
									<p className="fw-bold ad-price">
										Price:{" "}
										<span>
											{ShopFunctions.calculatePrice(
												ad.price
											)}
										</span>
									</p>
									<Link
										to={routerConfig.SHOP_AD.realUrl(
											ad._id
										)}
										className="primary-btn mt-3 d-inline-block"
									>
										See more
									</Link>
								</div>
							</div>
						);
					})}
				</main>
			</section>
		);
	};
	return (
		<div className="container">
			{isApiError && (
				<p className="mt-3">
					{isApiError}
				</p>
			)}
			{isApiFinish && ads ? productsLayout() : null}
		</div>
	);
}

export default ShopPage;
