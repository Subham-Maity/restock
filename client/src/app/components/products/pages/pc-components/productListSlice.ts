import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import {fetchAllProducts} from "./productListAPI";

interface ProductData {
    id: number;
    name: string;
}

const initialState = {
    products: [],
    status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
    "product/fetchAllProducts",
    async () => {
        const response = await fetchAllProducts();
        // The value we return becomes the `fulfilled` action payload
        // @ts-ignore
        return response.data;
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increment: (state) => {
            // state.products = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload;
            });
    },
});

export const selectAllProducts = (state: any) => state.product.products;

export default productSlice.reducer;