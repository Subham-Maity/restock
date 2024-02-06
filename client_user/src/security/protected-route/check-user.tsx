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
import { redirect, usePathname } from "next/navigation";
// Import your loader components
import ProductMainPcOrderSkeleton from "@/loader/skeleton/product-main-pc-order-skeleton";
import UserInfoSkeleton from "@/loader/skeleton/user-info-skeleton";
import AntdDefaultSpin from "@/loader/spin/antd-default-spin";
import CartSkeleton from "@/loader/skeleton/cart-skeleton";
import ProductCheckoutSkeleton from "@/loader/skeleton/product-checkout-skeleton";
import ProductDetailsSkeleton from "@/loader/skeleton/product-main-pc-details-skeleton";
import ProductListSkeleton from "@/loader/skeleton/product-main-pc-skeleton";
import { useAppSelector } from "@/store/redux/useSelector";
import { useCheckAuth } from "@/lib/features/auth/auth-react-query";

const routes = [
  { path: "order", Loader: ProductMainPcOrderSkeleton },
  { path: "profile", Loader: UserInfoSkeleton },
  { path: "cart", Loader: CartSkeleton },
  { path: "checkout", Loader: ProductCheckoutSkeleton },
  { path: "details", Loader: ProductDetailsSkeleton },
  { path: "components", Loader: ProductListSkeleton },
];

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userChecked = useAppSelector(selectUserChecked);

  console.log("userChecked", userChecked);

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
    // Wait for the router to be ready before checking pathname
    if (isReady) {
      // Find the matching route and render its loader
      for (let route of routes) {
        if (pathname.includes(route.path)) {
          const Loader = route.Loader;
          return <Loader />;
        }
      }
    }

    // If no matching route is found or router is not ready, render the general loader
    return <AntdDefaultSpin />;
  }

  if (!userChecked) {
    redirect("/login"); // Redirect to login page
  }

  return children;
};

export default CheckUser;
