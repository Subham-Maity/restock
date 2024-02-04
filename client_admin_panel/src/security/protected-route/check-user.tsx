"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { checkAuthAsync } from "@/lib/features/auth/auth-async-thunk";
import { selectUserChecked } from "@/lib/features/auth/auth-slice";
import { usePathname, useRouter } from "next/navigation";
// Import your loader components
import ProductDetailsSkeleton from "@/loader/skeleton/product-main-pc-details-skeleton";
import ProductListSkeleton from "@/loader/skeleton/product-main-pc-skeleton";
import AntdDefaultSpin from "@/loader/spin/antd-default-spin";
import { useAppSelector } from "@/store/redux/useSelector";

const routes = [
  { path: "details", Loader: ProductDetailsSkeleton },
  { path: "components", Loader: ProductListSkeleton },
];

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userChecked = useAppSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
    setIsReady(true);
  }, [dispatch]);

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
    router.push("/login"); // Redirect to login page
    return null;
  }

  return children;
};

export default CheckUser;
