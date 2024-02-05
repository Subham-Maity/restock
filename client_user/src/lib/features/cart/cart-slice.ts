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
  cartLoaded: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItemFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      state.items.splice(index, 1);
    },
    fetchItemsByUserId: (state, action) => {
      state.items = action.payload;
      state.cartLoaded = true;
    },
    resetCart: (state, action) => {
      state.items = action.payload;
    },
    updateCart: (state, action) => {
      const index = state.items.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      state.items[index] = action.payload;
    },
    setLoading: (state) => {
      state.status = "loading";
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
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
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
export const {
  addToCart,
  deleteItemFromCart,
  fetchItemsByUserId,
  resetCart,
  updateCart,
  setLoading,
} = cartSlice.actions;
export const { increment } = cartSlice.actions;

export const selectItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartStatus = (state: { cart: CartState }) =>
  state.cart.status;
export const selectCartLoaded = (state: { cart: CartState }) =>
  state.cart.cartLoaded;

export default cartSlice.reducer;
