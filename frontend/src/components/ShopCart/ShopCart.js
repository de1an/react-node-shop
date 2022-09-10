import React, { useEffect, useState, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import { useSelector } from "react-redux";
import "./shopCart.scss";
import SelectedProduts from "../SelectedProducts/SelectedProduts";
import ShopFunctions from "../../utilities/ShopFunctions";

function ShopCart() {
  const [totalPrice, setTotalPrice] = useState(0)
	const { cart } = useSelector((state) => state.cartStore);
  const cartLayoutRef = useRef();

	useEffect(() => {
    if (cart.length) {
      localStorage.setItem("Cart", JSON.stringify(cart))
    }
    onHandleTotalPrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const showCartLayout = () => {
    cartLayoutRef.current.classList.toggle("active");
  }

  const onHandleTotalPrice = () => {
    let price = 0;
    cart.forEach(ad => {
      price += ad.totalPrice;
    });
    setTotalPrice(price)
  }

	return (
    <>
    <div className="cart-layout" ref={cartLayoutRef}>
      <div className="shop-content p-2 my-3">
        <span className="close-icon" onClick={showCartLayout}><AiOutlineClose /></span>
        <h4 className="text-center mt-5 fw-bold">Your shop cart</h4>
        <div className="main-content">
          {cart.map((ad, index) => {
            return <SelectedProduts handlePrice={onHandleTotalPrice} ad={ad} key={index}/>
          })}
        </div>
        <p className="mt-5 fw-bold">Total price: <span className="price">{ShopFunctions.calculatePrice(totalPrice)}</span></p>
        <button className="primary-btn mt-4">Order Now</button>
      </div>
    </div>
		<div className="shop-cart-wrapper" onClick={showCartLayout}>
			<FaShoppingCart />
      {cart.length > 0 && <span className="badge cart-badge">{cart.length}</span>}

		</div>
    </>
	);
}

export default ShopCart;
