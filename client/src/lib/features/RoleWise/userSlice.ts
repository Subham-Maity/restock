import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    fetchLoggedInUser,
    fetchLoggedInUserOrders,
    updateUser,
} from "@/lib/api/RoleWiseFetch/userAPI";
import {User} from "@/lib/types/Auth/auth.type";

const initialState = {
    status: "idle",
    value: 0,
    userInfo: null as User | null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
    "user/fetchLoggedInUserOrders",
    async (id) => {
        const response = await fetchLoggedInUserOrders(id);
        return response.data;
    },
);

export const fetchLoggedInUserAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async (id: any) => {
        const response = await fetchLoggedInUser(id);
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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state: any, action) => {
                state.status = 'idle';
                state.userInfo.orders = action.payload;

            })
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

export const selectUserOrders = (state: { user: any }) => state.user.userInfo.orders;
export const selectUserInfo = (state: { user: any }) => state.user.userInfo;
export const selectUserInfoStatus = (state: { user: any }) => state.user.status;

export const {increment} = userSlice.actions;

export default userSlice.reducer;
