import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "@/api/categories/fetch-category";

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  },
);
