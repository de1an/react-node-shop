import React from 'react';
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { setQuantity } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import "./quantity.scss";

function Quantity({id, quantity}) {
  const dispatch = useDispatch();

  return (
    <p>Quantity: &nbsp;
      <span className={`icon ${quantity === 1 ? "pe-none": "pe-auto" }`} onClick={() => dispatch(setQuantity({id: id, actions: -1}))}><FaMinusCircle /></span> 
      &nbsp;{quantity}&nbsp;
      <span className="icon" onClick={() => dispatch(setQuantity({id: id, actions: 1}))}><FaPlusCircle /></span>
    </p>
  )
}

export default Quantity;