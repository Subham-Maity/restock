"use client";
import React from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { selectUserInfo } from "@/lib/features/own/own-details/own-details-slice";

export default function IfAdminRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = useSelector(selectUserInfo);

  if (userInfo && userInfo.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}
