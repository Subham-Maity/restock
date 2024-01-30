import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders } from "@/api/own/own-orders/logged-in-user-orders";

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "order/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  },
);
