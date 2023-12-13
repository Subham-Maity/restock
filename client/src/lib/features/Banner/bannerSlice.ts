import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BASE_URL} from "@/lib/constant/constants";
import {fetchBanner,putBanner} from "@/lib/api/Banner/bannerAPI";
const axios = require('axios')

export interface BannerState {
    status:string,
    images:[string]
}

const initialState:BannerState = {
    images:["https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/4.jpg?raw=true"],
    status:"init",
}


export const fetchBannerApiAsync = createAsyncThunk(
    "fetchBanner",
    async () => {
        const response = await fetchBanner();
        return response.data;
    },
);
// export const putBannerApiAsync = createAsyncThunk(
//     "fetchBanner",
//     async () => {
//         const response = await putBanner();
//         return response.data;
//     },
// );

export const bannerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchBannerApiAsync.pending,(state)=>{
                state.status="banner/fetching";
            })
            .addCase(fetchBannerApiAsync.fulfilled,(state,action)=>{
                state.status="banner/fetched";
                console.log("all images...",action.payload);
                state.images=action.payload;
            })
            // .addCase(putBannerApiAsync.pending,(state,action)=>{
            //     state.status="banner/putting";
            // })
            // .addCase(putBannerApiAsync.fulfilled,(state,action)=>{
            //     state.status="banner/put";
            //     state.images=action.payload;
            // })
    }
})

export default bannerSlice.reducer