import React, { useEffect, useState } from "react";
import ShopService from "../../services/ShopService";
import { Link } from "react-router-dom";
import "./shopPage.scss";
import ShopFunctions from "../../utilities/ShopFunctions";
import { routerConfig } from "../../config/routerConfig";
import { imageRoute } from "../../utilities/configUrl";

function ShopPage() {
	const [ads, setAds] = useState([]);
  const [isApiFinish, setIsApiFinish] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

	useEffect(() => {
		ShopService.getAllAds()
			.then((res) => {
				if (res.status === 200) {
          setAds(res.data);
				}
			})
			.catch((err) => {
        setIsApiError(true);
      }).finally(() => {
        setIsApiFinish(true);
      })
	}, []);

  const productsLayout = () => {
    return (
      <div className="row my-5">
      {ads.map((ad, index) => {
      return <div className="ad-cart col-md-4 mb-4" key={index}>
        <div>
          <img src={`${imageRoute}${ad.images[0]}`} alt="" className="img-fluid  d-block mx-auto" />
        </div>
        <div className="p-3">
          <h2 className="fw-bold">{ad.title}</h2>
          <p className="my-3">{ad.description.slice(0,30)}...</p>
          <p className="fw-bold ad-price">Price: <span>{ShopFunctions.calculatePrice(ad.price)}</span>
          </p>
          <Link to={routerConfig.SHOP_AD.realUrl(ad._id)} className="primary-btn mt-3 d-inline-block">See more</Link>
        </div>
      </div>
      })}
    </div>
    )
  }
	return (
    <div className="container">
      {isApiError && <p>An error has occurred, please try again later</p>}
      {(isApiFinish && ads.length) && productsLayout()}
    </div>
  );
}

export default ShopPage;
