import React from 'react';
import {FaTrashAlt} from "react-icons/fa";
import ShopFunctions from "../../utilities/ShopFunctions";
import "./selectedProducts.scss";

function SelectedProduts({ad}) {

  return (
    <div className="row mt-2 d-flex align-items-center">
      <div className="col-md-3">
        <img src={`http://localhost:4000/uploads/images/${ad.images[0]}`} alt="ad title" className="img-fluid" />
      </div>
      <div className="col-md-8">
        <p>{ad.title.substr(0, 25)}...</p>
        <p>Quantity: {ad.quantity}</p>
        <p>Price: <span className="price">{ShopFunctions.calculatePrice(ad.price, ad.quantity)}</span></p>
      </div>
      <div className="col-md-1 p-0">
        <span className="trash-icon"><FaTrashAlt /></span>
      </div>
    </div>
  )
}

export default SelectedProduts;