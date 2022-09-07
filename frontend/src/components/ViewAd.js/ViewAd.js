import React, {useState} from 'react';
import {FaShoppingCart} from "react-icons/fa";
import "./viewAd.scss";

function ViewAd({ad}) {
  const [quantity, setQuantity] = useState(1)
  const onHandleQuantity = (e) => {
    if (e.target.value < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(e.target.value);
  }

  return (
    ad &&
    (<div className="row single-ad d-flex align-items-center">
      <div className="col-md-5 slider-container">
        {/* slider */}
        <img src={`http://localhost:4000/uploads/images/${ad.images[0]}`} alt={ad.title} className="img-fluid" />
      </div>
      <div className="col-md-7 px-3 main-info">
        <h3 className="mb-3">{ad.title}</h3>
        <p className="mb-2">{ad.description}</p>
        <p className="mb-2 fw-bold fst-italic fs-3">Price: <span className="price">{(ad.price * quantity).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
							style: "currency",
							currency: "EUR",
						})}</span></p>
        <input type="number" className="quantity" defaultValue="1" min="1" onInput={onHandleQuantity} />

        <button className="primary-btn d-block mt-4"><span><FaShoppingCart /></span> Add To Cart</button>
      </div>
    </div>)
  )
}

export default ViewAd;