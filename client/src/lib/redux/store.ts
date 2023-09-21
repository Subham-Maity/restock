import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/app/components/products/pages/pc-components/productListSlice";
import authReducer from "@/app/components/auth/authSlice";
import cartReducer from "@/app/components/cart/cartSlice";
import bannerReducer from "@/app/components/Carousel/Carousel2/bannerSlice";
import orderReducer from "@/app/components/order/orderSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    banner:bannerReducer,
    order: orderReducer
  },
});

export type AppDispatch = typeof store.dispatch;
