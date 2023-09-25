"use client"
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch } from "@/lib/redux/store";
import {
  selectLoggedInUser,
  signOutAsync,
} from "@/app/components/auth/authSlice";
import {useRouter} from "next/navigation";

function Logout() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();

  useEffect(() => {
    dispatch(signOutAsync());
  });

  return <>{!user && router.push("/")}</>;
}

export default Logout;

