import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct } from "@/api/product/create-product";
import { updateProduct } from "@/api/product/update-product";
import {
  Filter,
  Pagination,
  Sort,
} from "@/types/data/product/product-main-pc.type";
import { fetchProductsByFilters } from "@/api/product/product-filter-sort-pagination-search";
import { fetchProductById } from "@/api/product/fetch-product-by-id";
import { fetchAllProducts } from "@/api/product/fetch-all-products";

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product: any) => {
    const response = await createProduct(product);
    return response.data;
  },
);
export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (update: any) => {
    const response = await updateProduct(update);
    return response.data;
  },
);

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  },
);

export const fetchAllStoreProductsAsync = createAsyncThunk(
  "product/fetchAllStoreProductsAsync",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  },
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id: any) => {
    const response = await fetchProductById(id);
    return response.data;
  },
);

export const productPcSlice = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({
    filter,
    sort,
    pagination,
    admin,
  }: {
    filter: Filter;
    sort: Sort;
    pagination: Pagination;
    admin: boolean;
  }) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      pagination,
      admin,
    );
    return response.data;
  },
);
