import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUser } from "@/api/own/own-details/logged-in-user";
import { updateUser } from "@/api/own/own-update-user/own-update-user";

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  },
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update: any) => {
    const response = await updateUser(update);
    return response.data;
  },
);
