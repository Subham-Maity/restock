// product-pc-slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createProductAsync,
  fetchAllProductByIdAsync,
  fetchAllStoreProductsAsync,
  productPcSlice,
  updateProductAsync,
} from "@/lib/features/product/product-pc-async-thunk";
import { ProductState } from "@/types/redux-slice/product/pc-product.slice.type";

const initialState: ProductState = {
  products: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
  allProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add your existing extra reducers related to products here
      .addCase(fetchAllStoreProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allProducts = action.payload;
      })
      .addCase(productPcSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productPcSlice.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state: any) => state.product.products;
export const selectAllProducts_ = (state: any) => state.product.allProducts;
export const selectTotalItems = (state: any) => state.product.totalItems;
export const selectProductById = (state: any) => state.product.selectedProduct;
export const selectProductListStatus = (state: any) => state.product.status;

export default productSlice.reducer;
