import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      // 
      let newProduct = {...action.payload}
      let foundProductIndex = null;

      let foundItem = state.cart.find((product, index) => {
        if (product._id === newProduct._id) {
          foundProductIndex = index;
          return product;
        }
      })
      if (foundItem) {
        state.cart[foundProductIndex].quantity = state.cart[foundProductIndex].quantity + newProduct.quantity;
        state.cart[foundProductIndex].totalPrice = state.cart[foundProductIndex].totalPrice + newProduct.totalPrice;
      }
      else state.cart.push(newProduct);
      
    },
    setCart: (state, action) => {
      state.cart = [...action.payload];
    }
  }
})

export const {addToCart, setCart} = cartSlice.actions;

export default cartSlice.reducer;