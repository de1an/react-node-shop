import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import loaderReducer from "./loaderSlice";

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    cartStore: cartReducer,
    loaderStore: loaderReducer,
  },
})