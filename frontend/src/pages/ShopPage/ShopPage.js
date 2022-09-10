import React, { useEffect, useState } from "react";
import ShopService from "../../services/ShopService";
import { Link } from "react-router-dom";
import "./shopPage.scss";
import ShopFunctions from "../../utilities/ShopFunctions";

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
      ads.map((ad, index) => {
      return <div className="row my-5 ads-container" key={index}>
        <div className="col-md-4">
          <img src={`http://localhost:4000/uploads/images/${ad.images[0]}`} alt="" className="img-fluid  d-block mx-auto" />
        </div>
        <div className="col-md-8 p-3">
          <h2 className="fw-bold">{ad.title}</h2>
          <p className="my-3">{ad.description.slice(0,100)}...</p>
          <p className="fw-bold ad-price">Price: <span>{ShopFunctions.calculatePrice(ad.price)}</span>
          </p>
          <Link to={`/shop/ad/${ad._id}`} className="primary-btn mt-3 d-inline-block">See more</Link>
        </div>
      </div>
      })
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
