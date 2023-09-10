import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/app/components/products/pages/pc-components/productListSlice";
import authReducer from "@/app/components/auth/authSlice";
import cartReducer from "@/app/components/cart/cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
