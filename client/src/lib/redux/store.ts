import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/features/Product/fetchProductsByFiltersAsync";
import authReducer from "@/lib/features/Auth/authSlice";
import cartReducer from "@/lib/features/Cart/cartSlice";
import bannerReducer from "@/lib/features/Banner/bannerSlice";
import orderReducer from "@/lib/features/Order/orderSlice";
import userReducer from "@/lib/features/RoleWise/userSlice";

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
