// product-pc-slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createProductAsync,
  fetchAllProductByIdAsync,
  fetchAllStoreProductsAsync,
  fetchProductsByFiltersAsync,
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
    fetchProductsByFilters: (state, action) => {
      state.products = action.payload;
      state.status = "idle";
    },
    fetchAllStoreProducts: (state, action) => {
      state.allProducts = action.payload;
      state.status = "idle";
    },
    fetchAllProductById: (state, action) => {
      state.selectedProduct = action.payload;
      state.status = "idle";
    },
    createProduct: (state, action) => {
      state.products.push(action.payload);
      state.status = "idle";
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );
      state.products[index] = action.payload;
      state.status = "idle";
      state.selectedProduct = action.payload;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStoreProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allProducts = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
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
        state.selectedProduct = action.payload;
      });
  },
});

// We will use this when we use react-query hook
export const {
  clearSelectedProduct,
  fetchProductsByFilters,
  fetchAllStoreProducts,
  fetchAllProductById,
  createProduct,
  updateProduct,
  setLoading,
} = productSlice.actions;
export const selectAllProducts = (state: any) => state.product.products;
export const selectAllProducts_ = (state: any) => state.product.allProducts;
export const selectTotalItems = (state: any) => state.product.totalItems;
export const selectProductById = (state: any) => state.product.selectedProduct;

// We will use this when we use react-query hook
export const selectProductListStatus = (state: any) => state.product.status;

export default productSlice.reducer;
