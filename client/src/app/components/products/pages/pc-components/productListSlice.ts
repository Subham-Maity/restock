import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
} from "@/app/components/products/pages/pc-components/productListAPI";

interface Filter {
  [key: string]: string[];
}

interface Sort {
  [key: string]: string;
}

interface Pagination {
  [key: string]: number;
}

interface ProductState {
  products: any[];
  status: "idle" | "loading";
  totalItems: number;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  totalItems: 0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({
    filter,
    sort,
    pagination,
  }: {
    filter: Filter;
    sort: Sort;
    pagination: Pagination;
  }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {},
  },
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
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state: any) => state.product.products;
export const selectTotalItems = (state: any) => state.product.totalItems;

export default productSlice.reducer;
