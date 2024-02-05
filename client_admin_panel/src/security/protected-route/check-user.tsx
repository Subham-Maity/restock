"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { checkAuthAsync } from "@/lib/features/auth/auth-async-thunk";
import { usePathname, useRouter } from "next/navigation";
// Import your loader components
import ProductDetailsSkeleton from "@/loader/skeleton/product-main-pc-details-skeleton";
import ProductListSkeleton from "@/loader/skeleton/product-main-pc-skeleton";

const routes = [
  { path: "details", Loader: ProductDetailsSkeleton },
  { path: "components", Loader: ProductListSkeleton },
];

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return children;
};

export default CheckUser;
