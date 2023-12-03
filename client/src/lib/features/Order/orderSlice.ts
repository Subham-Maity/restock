import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createOrder, fetchAllOrders, updateOrder} from "../../api/Order/orderAPI";
import {
  Order,
  OrderState,
} from "@/lib/types/Order/order.type";
import {Filter, Pagination, Sort} from "@/lib/types/Product/productList.type";

const initialState: OrderState = {
  orders: [],
  status: "idle",
  value: 0,
  currentOrder: null,
  totalOrders: 0
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order: Order) => {
    const response = await createOrder(order);
    return response.data;
  },
);
export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async (order: Order) => {
      const response = await updateOrder(order);

      return response.data;
    }
);

export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async ({sort, pagination}: {
      sort: Sort;
      pagination: Pagination;
    }) => {
      const response = await fetchAllOrders(sort,pagination);
      return response.data;
    }
);
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
      }).addCase(fetchAllOrdersAsync.pending, (state) => {
      state.status = 'loading';
    })
        .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders = action.payload.orders;
          state.totalOrders = action.payload.totalOrders;
        })
        .addCase(updateOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          const index =  state.orders.findIndex(order=>order.id===action.payload.id)
          state.orders[index] = action.payload;
        })
  },
});
export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state: { order: OrderState }) =>
  state.order.currentOrder;
export const selectOrders = (state: { order: OrderState }) => state.order.orders;
export const selectTotalOrders = (state: { order: OrderState }) => state.order.totalOrders;
export default orderSlice.reducer;
