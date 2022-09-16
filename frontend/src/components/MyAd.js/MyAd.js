import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ShopFunctions from "../../utilities/ShopFunctions";
import {Link} from "react-router-dom";
import "./myAd.scss";
import { routerConfig } from "../../config/routerConfig";
import { imageRoute } from "../../utilities/configUrl";

function MyAd({ product, deleteProduct }) {
	return (
		<div className="col-md-4 product-card px-0 mb-3">
			<div className="product-image">
				<img
					src={`${imageRoute}${product.images[0]}`}
					alt={product.title}
					className="img-fluid"
				/>
			</div>
			<div className="product-text">
				<h3 className="product-title" title={product.title}>
					{product.title.slice(0, 22)}...
				</h3>
				<p className="product-desc">
					{product.description.slice(0, 100)}...
				</p>
				<p className="product-price">
					Price:&nbsp;
					<span>{ShopFunctions.calculatePrice(product.price)}</span>
				</p>
				<div className="product-icons mt-4">
					<span className="bg-warning">
						<Link className="d-block" to={routerConfig.MY_ADS_EDIT.realUrl(product._id)}><FaEdit /></Link>
					</span>
					<span className="bg-danger" onClick={() => deleteProduct(product._id)}>
						<FaTrashAlt />
					</span>
				</div>
			</div>
		</div>
	);
}

export default MyAd;
