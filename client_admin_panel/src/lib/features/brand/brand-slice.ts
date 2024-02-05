import { createSlice } from "@reduxjs/toolkit";
import { fetchBrandsAsync } from "@/lib/features/brand/brand-async-thunk";

const initialState = {
  brands: [],
  status: "idle",
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    //we will use this when we use react-query hook
    setBrands: (state, action) => {
      state.brands = action.payload;
      state.status = "idle";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
  },
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

//We will use this when we use react-query hook
export const { setBrands, setLoading } = brandsSlice.actions;

export const selectBrands = (state: any) => state.brands.brands;

//We will use this when we use react-query hook
export const selectBrandListStatus = (state: any) => state.brands.status;

export default brandsSlice.reducer;
