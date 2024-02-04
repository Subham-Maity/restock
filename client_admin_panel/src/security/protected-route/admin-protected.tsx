"use client";
import React from "react";

import { redirect } from "next/navigation";
import { selectUserInfo } from "@/lib/features/own/own-details/own-details-slice";
import { useAppSelector } from "@/store/redux/useSelector";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = useAppSelector(selectUserInfo);

  if (userInfo && userInfo.role !== "admin") {
    redirect("/login");
  }

  return <>{children}</>;
}
