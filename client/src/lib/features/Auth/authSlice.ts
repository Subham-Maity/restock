import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { AuthState, User } from "@/lib/types/Auth/auth.type";
import { updateUser } from "@/lib/api/RoleWiseFetch/userAPI";
import {checkUser, createUser, signOut} from "@/lib/api/Auth/authAPI";

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
    async (loginInfo: { email: string; password: string },{rejectWithValue}) => {
      try {
        const response = await checkUser(loginInfo);
        return response.data as User
      } catch (error: any) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
);


export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (loginInfo) => {
    const response = await signOut(loginInfo);
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
        state.error = action.payload;
      })

      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});
export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state: { auth: AuthState }) =>
  state.auth.loggedInUser;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
