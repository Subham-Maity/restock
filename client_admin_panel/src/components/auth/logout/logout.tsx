"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { useRouter } from "next/navigation";
import { signOutAsync } from "@/lib/features/auth/auth-async-thunk";
import { useAppSelector } from "@/store/redux/useSelector";

function Logout() {
  const dispatch: AppDispatch = useDispatch();
  const user = useAppSelector(selectLoggedInUser);
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
