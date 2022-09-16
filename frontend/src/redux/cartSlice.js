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

      // eslint-disable-next-line array-callback-return
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
    },
    removeProduct: (state, action) => {
      let cartCopy = [...state.cart];
      cartCopy.splice(action.payload, 1);
      state.cart = cartCopy;
      localStorage.setItem("Cart", JSON.stringify(cartCopy));
    },
    setQuantity: (state, action) => {
      const {id, actions} = action.payload;
      state.cart.forEach(product => {
        if (product._id === id) {
          (actions === -1) ? product.quantity-- : product.quantity++;
          product.totalPrice = product.quantity * product.price;
        }
      })
    }
  }
})

export const {addToCart, setCart, removeProduct, setQuantity} = cartSlice.actions;

export default cartSlice.reducer;