import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart } from "@/api/cart/add-to-cart";
import { fetchItemsByUserId } from "@/api/cart/fetch-item-by-user";
import { updateCart } from "@/api/cart/update-cart";
import { deleteItemFromCart } from "@/api/cart/dalete-item-from-cart";
import { resetCart } from "@/api/cart/reset-cart";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item: any) => {
    const response = await addToCart(item);
    return response.data;
  },
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  },
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update: any) => {
    const response = await updateCart(update);
    return response.data;
  },
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId: any) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  },
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});
