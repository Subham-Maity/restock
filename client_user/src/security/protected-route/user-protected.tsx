"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { redirect, useRouter } from "next/navigation";
import { User } from "@/types/data/auth/auth.type";

export default function UserProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user: User | null = useSelector(selectLoggedInUser);

  if (!user) {
    redirect("/login");
  }

  return user ? children : null;
}
