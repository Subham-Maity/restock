import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// @ts-ignore
export default function CarouselNew({props}) {
    // let sliders = [];
    // sliders=props.map((images)=>{
    //     return (
    //         <SwiperSlide>
    //             <img src={"https://cdn.pixabay.com/photo/2023/06/07/14/21/mountain-8047293_1280.jpg"}/>
    //         </SwiperSlide>
    //     )
    // })
    return (
        <>
            hi
            {/*<Swiper*/}
            {/*    slidesPerView={1}*/}
            {/*    spaceBetween={30}*/}
            {/*    loop={true}*/}
            {/*    pagination={{*/}
            {/*        clickable: true,*/}
            {/*    }}*/}
            {/*    navigation={true}*/}
            {/*    modules={[Pagination, Navigation]}*/}
            {/*    className="mySwiper"*/}
            {/*>*/}

            {/*    {sliders}*/}
            {/*    <SwiperSlide>*/}
            {/*        <img className="rounded-2xl " src={{images.href}}/>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 2</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 3</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 4</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 5</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 6</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 7</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 8</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 9</SwiperSlide>*/}
            {/*</Swiper>*/}
        </>
    );
}



/*import from redux*/
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

/*import APIS*/
import {fetchAllProducts} from "@/app/components/products/pages/pc-components/productListAPI";


/*interface*/
interface ProductState {
    products: any[],
    status: "idle" | "loading" | "fulfilled"
}


/*initial state declaration*/

const initialState: ProductState = {
    products: [],
    status: "idle"
}


/*Async Thunk*/

export const fetchAllProductsAsync = createAsyncThunk(
    "product/fetchAllProducts",
    async () => {
        const response = await fetchAllProducts()
        return response.data;
    }
);

/*Create Slice*/

export const productSlice = createSlice(
    {
        name: "product",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllProductsAsync.pending, (state) => {
                    state.status = "loading"
                })
                .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                    state.status = "idle";
                    state.products = action.payload
                })

        }


    }
)
/*Selector*/
export const selectAllProducts = (state: { product: ProductState }) => state.product.products;

// export default productSlice.reducer;