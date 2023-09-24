"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { User } from "@/app/components/auth/auth.type";
import { selectLoggedInUser } from "@/app/components/auth/authSlice";
import { fetchLoggedInUserAsync } from "@/app/components/user/userSlice";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const user: User | null = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return <>{children}</>;
};

export default UserProvider;
