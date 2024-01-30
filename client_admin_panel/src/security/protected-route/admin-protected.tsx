"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { redirect } from "next/navigation";
import { User } from "@/types/data/auth/auth.type";
import { selectUserInfo } from "@/lib/features/own/userSlice";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: User | null = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  if (!user) {
    redirect("/login");
  }

  if (user && userInfo.role !== "admin") {
    redirect("/admin");
  }

  return user ? children : null;
}
