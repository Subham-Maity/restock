import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';
import {Order, OrderState} from "@/app/components/order/order.type";

const initialState: OrderState = {
    orders: [],
    status: 'idle',
    value: 0,
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
            });
    },
});

export const { increment } = orderSlice.actions;

export default orderSlice.reducer;
