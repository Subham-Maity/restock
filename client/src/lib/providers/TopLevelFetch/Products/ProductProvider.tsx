"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {fetchAllStoreProductsAsync} from "@/lib/features/Product/fetchProductsByFiltersAsync";


const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllStoreProductsAsync());
    }, [dispatch]);

    return <>{children}</>;
};

export default ProductProvider;
