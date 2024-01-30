import { createSlice } from "@reduxjs/toolkit";

import { OrderState } from "@/types/redux-slice/own/own-order.slice.type";
import { fetchLoggedInUserOrderAsync } from "@/lib/features/own/own-orders/own-orders-async-thunk";

const initialOrderState: OrderState = {
  status: "idle",
  userOrders: null as any[] | null,
};

export const orderSlice = createSlice({
  name: "userOrder",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state: any, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state: { userOrder: any }) =>
  state.userOrder.userOrders;
export const selectUserOrdersStatus = (state: { userOrder: any }) =>
  state.userOrder.status;

export default orderSlice.reducer;
