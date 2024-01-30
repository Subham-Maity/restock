import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartAsync,
  deleteItemFromCartAsync,
  fetchItemsByUserIdAsync,
  resetCartAsync,
  updateCartAsync,
} from "@/lib/features/cart/cart-async-thunk";
import { CartState } from "@/types/redux-slice/cart/cart.slice.type";

const initialState: CartState = {
  status: "idle",
  items: [],
  value: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item: any) => item.id === action.payload.id,
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item: any) => item.id === action.payload.id,
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectItems = (state: { cart: any }) => state.cart.items;

export default cartSlice.reducer;
