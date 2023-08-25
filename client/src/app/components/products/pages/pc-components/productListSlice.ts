/*import from redux*/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*import APIS*/
import {
  fetchAllProducts,
  fetchAllProductsByFilter,
} from "@/app/components/products/pages/pc-components/productListAPI";
import { useState } from "react";
import { sort } from "next/dist/build/webpack/loaders/css-loader/src/utils";

/*interface*/
interface ProductState {
  products: any[];
  status: "idle" | "loading" | "fulfilled";
}

/*initial state declaration*/

const initialState: ProductState = {
  products: [],
  status: "idle",
};

/*Async Thunk*/

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  },
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchAllProductsByFilter",
  async (filter, sort) => {
    const response = await fetchAllProductsByFilter(filter, sort);
    return response.data;
  },
);

/*Create Slice*/

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});
/*Selector*/
export const selectAllProducts = (state: { product: ProductState }) =>
  state.product.products;

//reducer generated by createReducer
//@ts-ignore
export default productSlice.reducer;

// export const { } = productSlice.actions;
