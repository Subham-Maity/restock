import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBanner } from "@/api/banner/fetch-banner";

export const fetchBannerApiAsync = createAsyncThunk("fetchBanner", async () => {
  const response = await fetchBanner();
  return response.data;
});
