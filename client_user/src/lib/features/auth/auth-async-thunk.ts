import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/data/auth/auth.type";
import { createUser } from "@/api/auth/create-user";
import { loginUser } from "@/api/auth/login-user";
import { signOut } from "@/api/auth/logout";

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData: any) => {
    const response = await createUser(userData);
    return response.data as User;
  },
);
export const loginUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (
    loginInfo: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data as User;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    return response.data as User;
  },
);
