import axios from "axios";

class ShopService {
  static addProduct(product){
    return axios.post("/api/shop/add-product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static editProduct(product){
    return axios.put("/api/shop/edit-product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static deleteAd(id){
    return axios.delete(`/api/shop/delete-ad/${id}`);
  }
  static getMyAds(userId){
    return axios.get(`/api/shop/get-my-ads/${userId}`);
  }
  static getAllAds(){
    return axios.get("/api/shop/get-all-ads");
  }
  static getSingleAd(id){
    return axios.get(`/api/shop/get-single-ad/${id}`);
  }
  static getAllSearched(data){
    return axios.get(`/api/shop/search?q=${data}`);
  }
}

export default ShopService;