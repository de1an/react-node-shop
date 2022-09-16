import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ShopService from "../../services/ShopService";
import { imageRoute } from "../../utilities/configUrl";
import "./editProduct.scss";

function EditProduct() {
  const {id} = useParams();
  const [ad, setAd] = useState({});

  useEffect(() => {
    ShopService.getSingleAd(id).then((res) => {
      if (res.status === 200) {
        setAd(res.data);
      }
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    })
  }, [id])


  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-5">
          <h2 className="fw-bold mb-3">Edit your product</h2>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" defaultValue={ad.title} className="form-control mb-3"/>
          <label htmlFor="description">Description</label>  
          <input type="text" name="description" defaultValue={ad.description} className="form-control mb-3"/> 
          <label htmlFor="price">Price</label> 
          <input type="text" name="price" defaultValue={ad.price} className="form-control mb-3"/>   
        </div>
        <div className="col-md-7">
          <h3 className="mb-4">Images</h3>
          <div className="images-container d-flex">
            {ad?.title && ad.images.map((image, index) => {
              return <div className="img-cart" key={index}>
                <img src={imageRoute + image} alt="title img" />
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct;