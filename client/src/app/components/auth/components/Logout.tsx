"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
  selectLoggedInUser,
  signOutAsync,
} from "@/app/components/auth/authSlice";
import { useRouter } from "next/navigation";

function Logout() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();

  useEffect(() => {
    dispatch(signOutAsync());

    if (!user) {
      router.push("/");
    }
  }, [user, router, dispatch]);

  return null;
}

export default Logout;
