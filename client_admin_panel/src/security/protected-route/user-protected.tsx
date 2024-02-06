"use client";
import React from "react";

import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { redirect } from "next/navigation";
import { User } from "@/types/data/auth/auth.type";
import { useAppSelector } from "@/store/redux/useSelector";

export default function UserProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: User | null = useAppSelector(selectLoggedInUser);

  if (!user) {
    redirect("/login");
  }

  return user ? children : null;
}
