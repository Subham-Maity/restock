import { createSlice } from "@reduxjs/toolkit";
import { fetchBrandsAsync } from "@/lib/features/brand/brand-async-thunk";
import { BrandState } from "@/types/redux-slice/brand/brand.slice.type";

const initialState: BrandState = {
  brands: [],
  status: "idle",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      });
  },
});

export const selectBrands = (state: any) => state.brand.brands;
export const selectBrandListStatus = (state: any) => state.brand.status;

export default brandSlice.reducer;
