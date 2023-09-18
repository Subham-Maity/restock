import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {createAction} from "@reduxjs/toolkit/src";

const axios = require('axios')

export interface BannerState {
    status:string,
    images:[string]
}

const initialState:BannerState = {
    images:["https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/4.jpg?raw=true"],
    status:"init",
}

const fetchBrands=async()=>{
        let response = await axios.get("https://restock-api.onrender.com/banner");
        console.log("res",response.data.href);
        return response;
    // })
    // return "https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/4.jpg?raw=true"
}

export const fetchApiAsync = createAsyncThunk(
    "fetchBanner",
    async () => {
        const response = await fetchBrands();
        return response.data;
    },
);

export const bannerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        // @ts-ignore
        builder
            .addCase(fetchApiAsync.pending,(state)=>{
                state.status="banner/fetching";
            })
            .addCase(fetchApiAsync.fulfilled,(state,action)=>{
                state.status="banner/fetched";
                state.images=action.payload;
            })
    }
})


export default bannerSlice.reducer