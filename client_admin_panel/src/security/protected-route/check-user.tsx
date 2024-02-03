"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { checkAuthAsync } from "@/lib/features/auth/auth-async-thunk";
import { selectUserChecked } from "@/lib/features/auth/auth-slice";
import { useRouter } from "next/navigation";

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  //TODO: If need we will use this
  // If a user is not logged in, redirect to login page
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);
  return <>{children}</>;
};

export default CheckUser;
