import React from 'react';

function MyAd({product}) {
  
  return (
    <div className="col-md-4 product-card px-0">
      <div className="product-image">
        <img src={`http://localhost:4000/uploads/images/${product.images[0]}`} alt={product.title} className="img-fluid" />
      </div>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-desc">{product.description}</p>
      <span className="product-price">{product.price}</span>
    </div>
  )
}

export default MyAd;