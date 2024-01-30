import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/data/auth/auth.type";
import {
  fetchLoggedInUserAsync,
  updateUserAsync,
} from "@/lib/features/own/own-details/own-details-async-thunk";
import { UserState } from "@/types/redux-slice/own/own-info.slice.type";

const initialUserState: UserState = {
  status: "idle",
  userInfo: null as User | null,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const selectUserInfo = (state: { userInfo: any }) =>
  state.userInfo.userInfo;
export const selectUserInfoStatus = (state: { userInfo: any }) =>
  state.userInfo.status;

export default userSlice.reducer;
