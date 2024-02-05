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
  reducers: {
    //we will use this when we use react-query hook
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.status = "idle";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
  },
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

//We will use this when we use react-query hook
export const { setCategories, setLoading } = categorySlice.actions;

export const selectCategories = (state: any) => state.category.categories;
export const selectCategoryListStatus = (state: any) => state.category.status;

export default categorySlice.reducer;
