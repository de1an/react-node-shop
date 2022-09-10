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
}

export default ShopFunctions;