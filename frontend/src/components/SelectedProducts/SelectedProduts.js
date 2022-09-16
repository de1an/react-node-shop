import React from 'react';
import {FaTrashAlt} from "react-icons/fa";
import { useDispatch } from "react-redux";
import {removeProduct} from "../../redux/cartSlice";
import { imageRoute } from "../../utilities/configUrl";
import ShopFunctions from "../../utilities/ShopFunctions";
import Quantity from "../Quantity/Quantity";
import "./selectedProducts.scss";

function SelectedProduts({ad, index}) {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(removeProduct(index));
  }

  return (
    <div className="row mt-2 d-flex align-items-center">
      <div className="col-md-3">
        <img src={`${imageRoute}${ad.images[0]}`} alt="ad title" className="img-fluid" />
      </div>
      <div className="col-md-8">
        <p>{ad.title.substr(0, 25)}...</p>
        <Quantity id={ad._id} quantity={ad.quantity} /> 
        <p>Price: <span className="price">{ShopFunctions.calculatePrice(ad.price, ad.quantity)}</span></p>
      </div>
      <div className="col-md-1 p-0">
        <span className="trash-icon" onClick={removeFromCart}><FaTrashAlt /></span>
      </div>
    </div>
  )
}

export default SelectedProduts;