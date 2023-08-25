import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../app/components/products/pages/pc-components/productListSlice";

export const store = configureStore({
  reducer: { product: productReducer },
});

export type AppDispatch = typeof store.dispatch;
