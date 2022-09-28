class ShopFunctions {
  static calculatePrice(price, quantity = 1){
    const calculatePrice = price * quantity;

    return calculatePrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "EUR",
    })
  }
  static lowerToHigher(ads) {
    return ads.sort((a, b) => a.price - b.price);
  }
  static higherToLower(ads) {
    return ads.sort((a, b) => b.price - a.price);
  }
}

export default ShopFunctions;