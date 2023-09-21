import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';
import {Order, OrderState} from "@/app/components/order/order.type";
import {CartState} from "@/app/components/cart/cart.type";

const initialState: OrderState = {
    orders: [],
    status: 'idle',
    value: 0,
    currentOrder: null,

};

export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order: Order) => {
        const response = await createOrder(order);
        return response.data;
    },
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders.push(action.payload);
                state.currentOrder=action.payload;
            });
    },
});

export const { increment } = orderSlice.actions;
export const selectCurrentOrder = (state: { order: OrderState }) => state.order.currentOrder;
export default orderSlice.reducer;
