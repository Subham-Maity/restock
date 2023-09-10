"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { fetchItemsByUserIdAsync } from "@/app/components/cart/cartSlice";
import { User } from "@/app/components/auth/auth.type";
import { selectLoggedInUser } from "@/app/components/auth/authSlice";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const user: User | null = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return <>{children}</>;
};

export default CartProvider;
