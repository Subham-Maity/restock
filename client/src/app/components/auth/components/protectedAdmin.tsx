"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "@/app/components/auth/authSlice";
import { useRouter } from "next/navigation";
import { User } from "@/app/components/auth/auth.type";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user: User | null = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  return user ? children : null;
}
