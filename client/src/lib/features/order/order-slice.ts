import { createSlice } from "@reduxjs/toolkit";

import {
  createOrderAsync,
  fetchAllOrdersAsync,
  updateOrderAsync,
} from "@/lib/features/order/order-async-thunk";
import { OrderState } from "@/types/redux-slice/order/order.slice.type";

const initialState: OrderState = {
  orders: [],
  status: "idle",
  value: 0,
  currentOrder: null,
  totalOrders: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        );
        state.orders[index] = action.payload;
      });
  },
});
export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state: { order: OrderState }) =>
  state.order.currentOrder;
export const selectOrders = (state: { order: OrderState }) =>
  state.order.orders;
export const selectTotalOrders = (state: { order: OrderState }) =>
  state.order.totalOrders;
export default orderSlice.reducer;
