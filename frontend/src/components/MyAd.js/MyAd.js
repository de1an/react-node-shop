import React from "react";
import "./myAd.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function MyAd({ product }) {
	return (
		<div className="col-md-4 product-card px-0 ">
			<div className="product-image">
				<img
					src={`http://localhost:4000/uploads/images/${product.images[0]}`}
					alt={product.title}
					className="img-fluid"
				/>
			</div>
			<div className="product-text">
				<h3 className="product-title" title={product.title}>
					{product.title.slice(0, 35)}...
				</h3>
				<p className="product-desc">
					{product.description.slice(0, 100)}...
				</p>
				<p className="product-price">
					Price:&nbsp;
					<span>
						{product.price.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
							style: "currency",
							currency: "EUR",
						})}
					</span>
				</p>
				<div className="product-icons mt-4">
					<span className="bg-warning">
            <FaEdit />
          </span>
					<span className="bg-danger">
            <FaTrashAlt />
          </span>
				</div>
			</div>
		</div>
	);
}

export default MyAd;
