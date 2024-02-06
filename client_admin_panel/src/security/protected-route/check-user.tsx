"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import {
  checkAuthFailed,
  checkAuthLoading,
  checkAuthSuccess,
  selectUserChecked,
} from "@/lib/features/auth/auth-slice";
import { usePathname } from "next/navigation";
// Import your loader components
import AntdDefaultSpin from "@/loader/spin/antd-default-spin";

import ProductDetailsSkeleton from "@/loader/skeleton/product-main-pc-details-skeleton";
import ProductListSkeleton from "@/loader/skeleton/product-main-pc-skeleton";
import { useAppSelector } from "@/store/redux/useSelector";
import { useCheckAuth } from "@/lib/features/auth/auth-react-query";

const routes = [
  { path: "orders", Loader: ProductDetailsSkeleton },
  { path: "profile", Loader: ProductDetailsSkeleton },
  { path: "details", Loader: ProductDetailsSkeleton },
  { path: "components", Loader: ProductListSkeleton },
];

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userChecked = useAppSelector(selectUserChecked);

  const { data: user, status: isLoading } = useCheckAuth();

  useEffect(() => {
    if (isLoading === "loading") {
      dispatch(checkAuthLoading());
    }

    if (isLoading === "success") {
      dispatch(checkAuthSuccess(user));
    }

    if (isLoading === "error") {
      dispatch(checkAuthFailed());
    }
    setIsReady(true);
  }, [dispatch, isLoading, user]);

  if (!userChecked) {
    if (isReady) {
      for (let route of routes) {
        if (pathname.includes(route.path)) {
          const Loader = route.Loader;
          return <Loader />;
        }
      }
    }
    return <AntdDefaultSpin />;
  }
  return children;
};

export default CheckUser;
