import axios from "axios";

class ShopService {
  static addProduct(product){
    return axios.post("/api/shop/add-product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
}

export default ShopService;