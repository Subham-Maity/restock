"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "@/lib/features/Auth/authSlice";
import { redirect, useRouter } from "next/navigation";
import { User } from "@/lib/types/Auth/auth.type";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user: User | null = useSelector(selectLoggedInUser);

  if (!user) {
    redirect("/login");
  }

  return user ? children : null;
}
