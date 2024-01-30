import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "@/types/data/order/order.type";
import { Pagination, Sort } from "@/types/data/product/product-main-pc.type";
import { createOrder } from "@/api/order/create-order";
import { updateOrder } from "@/api/order/update-order";
import { fetchAllOrders } from "@/api/order/fetch-all-orders";

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order: Order) => {
    const response = await createOrder(order);
    return response.data;
  },
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order: Order) => {
    const response = await updateOrder(order);

    return response.data;
  },
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }: { sort: Sort; pagination: Pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  },
);
