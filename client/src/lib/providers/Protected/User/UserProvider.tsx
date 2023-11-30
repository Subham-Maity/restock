"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { User } from "@/lib/types/Auth/auth.type";
import { selectLoggedInUser } from "@/lib/features/Auth/authSlice";
import { fetchLoggedInUserAsync } from "@/lib/features/RoleWise/userSlice";

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
