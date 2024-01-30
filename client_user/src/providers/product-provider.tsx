"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { fetchAllStoreProductsAsync } from "@/lib/features/product/product-pc-async-thunk";

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllStoreProductsAsync());
  }, [dispatch]);

  return <>{children}</>;
};

export default ProductProvider;
