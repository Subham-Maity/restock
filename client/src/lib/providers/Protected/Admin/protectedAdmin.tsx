"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "@/lib/features/Auth/authSlice";
import { redirect, useRouter } from "next/navigation";
import { User } from "@/lib/types/Auth/auth.type";
import {selectUserInfo} from "@/lib/features/RoleWise/userSlice";

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
