import { createSlice } from "@reduxjs/toolkit";
import { bannerImages } from "@/constant/constants";
import { fetchBannerApiAsync } from "@/lib/features/banner/banner-async-thunk";
import { BannerState } from "@/types/redux-slice/banner/banner.slice.type";

const initialState: BannerState = {
  images: [bannerImages],
  status: "init",
};

export const bannerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerApiAsync.pending, (state) => {
        state.status = "banner/fetching";
      })
      .addCase(fetchBannerApiAsync.fulfilled, (state, action) => {
        state.status = "banner/fetched";
        state.images = action.payload;
      });
  },
});

export default bannerSlice.reducer;
