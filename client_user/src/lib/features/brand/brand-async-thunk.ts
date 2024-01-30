import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrands } from "@/api/brand/fetch-brand";

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  },
);
