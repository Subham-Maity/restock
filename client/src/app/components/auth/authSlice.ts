import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authAPI";
import { AuthState, User } from "@/app/components/auth/auth.type";
import { updateUser } from "@/app/components/user/userAPI";

const initialState: AuthState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData: User) => {
    const response = await createUser(userData);
    return response.data as User;
  },
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo: { email: string; password: string }) => {
    const response = await checkUser(loginInfo);
    return response.data as User;
  },
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update: User) => {
    const response = await updateUser(update);
    return response.data as User;
  },
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      });
  },
});
export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state: { auth: AuthState }) =>
  state.auth.loggedInUser;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
