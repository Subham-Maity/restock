"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { User } from "@/types/data/auth/auth.type";
import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { fetchLoggedInUserAsync } from "@/lib/features/own/own-details/own-details-async-thunk";
import { useAppSelector } from "@/store/redux/useSelector";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const user: User | null = useAppSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return <>{children}</>;
};

export default UserProvider;
