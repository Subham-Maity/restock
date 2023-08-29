import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../app/components/products/pages/pc-components/productListSlice";
import { productsAPI } from "@/lib/redux/slice/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    product: productReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
