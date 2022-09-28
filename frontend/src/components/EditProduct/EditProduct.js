import React, {useEffect, useState} from 'react';
import {useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { routerConfig } from "../../config/routerConfig";
import ShopService from "../../services/ShopService";
import { imageRoute } from "../../utilities/configUrl";
import "./editProduct.scss";

function EditProduct() {
  const [ad, setAd] = useState({});
  const [newImages, setNewImages] = useState(null);
  const {id} = useParams();
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    ShopService.getSingleAd(id)
    .then((res) => {
      if (res.status === 200) {
        setAd(res.data);
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    })
  }, [id])

  const onHandleIsChecked = (e, image) => {
    if (e.target.checked) {
      setImagesToDelete(prevState => [...prevState, image])
    } else {
      let copyImagesToDelete = imagesToDelete.filter(item => item !== image);
      setImagesToDelete(prevState => [...copyImagesToDelete]);
    }
  }

  const onHandleInput = (e) => {
    const {name, value} = e.target;
    let copyProductObj = {};
    copyProductObj[name] = value;
    setAd(prevState => {return {...prevState, ...copyProductObj}});
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    
    if (!ad.title || !ad.description || !ad.price || ad.images.length === 0) {
      return;
    }
    ad.deleteImages = [...imagesToDelete];
    
    const formData = new FormData();
    formData.append("product", JSON.stringify(ad));

    if (newImages) {
      for (const key in newImages) {
        formData.append("newImages", newImages[key]);
      }
    }
    
    ShopService.editProduct(formData)
    .then((res) => {
      if (res.status === 200) {
        toast.success("You successfully edit your product.", {autoClose: 2000,});
        setTimeout(() => {
          navigate(routerConfig.MY_ADS.url);
        }, 2500)
      }
    })
    .catch((err) => {
      toast.error("Something went wrong, please try again later.", {autoClose: 2000});
    })
  }

  const onHandleFile = (e) => {
    setNewImages({...e.target.files})
  }

  return (
    <>
    <div className="container">
      <div className="row my-4">
        <h3 className="my-3">Edit your product</h3>
        <div className="col-md-5">
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" defaultValue={ad.title} className="form-control mb-3" onInput={onHandleInput}/>
          <label htmlFor="description">Description:</label>
          <textarea name="description" rows="5" defaultValue={ad.description} className="form-control mb-3" onInput={onHandleInput}/>
          <label htmlFor="price">Price:</label> 
          <input type="text" name="price" defaultValue={ad.price} className="form-control mb-3" onInput={onHandleInput}/>
          <label htmlFor="images">Add new images</label>
						<input
							onInput={onHandleFile}
							type="file"
							multiple
							name="images"
							id="images"
							className="form-control"
						/>   
        </div>
        <div className="col-md-7">
          <h3 className="mb-4">Images:</h3>
          <p className="mb-3">Select the image if you want to delete it.</p>
          <div className="row mb-4">
            {ad?.images && ad.images.map((image, index) => {
              return <div className="img-cart col-md-4" key={index}>
                <input type="checkbox" id="img-check" data-index={index} className="image-checkbox" onChange={(e) => onHandleIsChecked(e, image)}/>
                <img src={imageRoute + image} alt="title img" />
              </div>
            })}
          </div>
        </div>
      </div>
      <button onClick={onHandleSubmit} className="primary-btn edit-btn">Edit product</button>
    </div>
    <ToastContainer />
    </>
  )
}

export default EditProduct;