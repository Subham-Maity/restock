import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoriesAsync } from "@/lib/features/category/category-async-thunk";
import { CategoryState } from "@/types/redux-slice/category/category.slice.type";

const initialState: CategoryState = {
  categories: [],
  status: "idle",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      });
  },
});

export const selectCategories = (state: any) => state.category.categories;
export const selectCategoryListStatus = (state: any) => state.category.status;

export default categorySlice.reducer;
