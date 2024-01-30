"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { useRouter } from "next/navigation";
import { signOutAsync } from "@/lib/features/auth/auth-async-thunk";

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
