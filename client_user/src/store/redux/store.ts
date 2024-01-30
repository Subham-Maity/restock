import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/features/product/product-pc-slice";
import authReducer from "@/lib/features/auth/auth-slice";
import cartReducer from "@/lib/features/cart/cart-slice";
import bannerReducer from "@/lib/features/banner/banner-slice";
import orderReducer from "@/lib/features/order/order-slice";
import userReducer from "@/lib/features/own/own-details/own-details-slice";
import userOrderReducer from "@/lib/features/own/own-orders/own-orders-slice";
import brandReducer from "@/lib/features/brand/brand-slice";
import categoryReducer from "@/lib/features/category/category-slice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    banner: bannerReducer,
    order: orderReducer,
    userInfo: userReducer,
    userOrder: userOrderReducer,
    brand: brandReducer,
    category: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
