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

import { useAppSelector } from "@/store/redux/useSelector";
import { useCheckAuth } from "@/lib/features/auth/auth-react-query";
import GridLargeViewSkeleton from "@/loader/skeleton/product-t1/grid-large-view-skeleton";

const routes = [
  { path: "profile", Loader: GridLargeViewSkeleton },
  { path: "details", Loader: GridLargeViewSkeleton },
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
