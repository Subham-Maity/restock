"use client";
import React, { useContext, useEffect } from "react";
import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { useAppSelector } from "@/store/redux/useSelector";
import { useRouter } from "next/navigation";
import Context from "@/store/context/context";

export default function IfUserAdminLoginRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectLoggedInUser);
  const router = useRouter();
  const { prevPath } = useContext(Context);

  useEffect(() => {
    if (user) {
      //only for admin app
      if (prevPath) {
        // If the user came from another route, go back to that route
        router.push(prevPath);
      } else {
        // If the user directly typed the login route in the address bar, go to the home page
        router.push("/");
      }
    }
  }, [router, user, prevPath]);

  return children;
}
