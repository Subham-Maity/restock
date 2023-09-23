import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/app/components/products/pages/pc-components/productListSlice";
import authReducer from "@/app/components/auth/authSlice";
import cartReducer from "@/app/components/cart/cartSlice";
import bannerReducer from "@/app/components/Carousel/Carousel2/bannerSlice";
import orderReducer from "@/app/components/OrderSuccess/order/orderSlice";
import userReducer from "@/app/components/user/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    banner: bannerReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
