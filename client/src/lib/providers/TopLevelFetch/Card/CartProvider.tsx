"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { fetchItemsByUserIdAsync } from "@/lib/features/Cart/cartSlice";
import { User } from "@/lib/types/Auth/auth.type";
import { selectLoggedInUser } from "@/lib/features/Auth/authSlice";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const user: User | null = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
    }
  }, [dispatch, user]);

  return <>{children}</>;
};

export default CartProvider;
