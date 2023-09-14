import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState = {
    images:["https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/4.jpg?raw=true"]
}

const api= async ()=>{
    const response = await fetch("https://restock-api.onrender.com/banner");
    const data = await response.json();
    console.log("server send",data);
    return data;
}
export const bannerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        set: (state) => {
            let data = api();
            // @ts-ignore
            state.images.push(data);
            state.images.push("https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/3.jpg?raw=true")
        },

    },
})

// Action creators are generated for each case reducer function
export const { set } = bannerSlice.actions

export default bannerSlice.reducer