import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../app/components/products/pages/pc-components/productListSlice";
import authReducer from "../../app/components/auth/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
