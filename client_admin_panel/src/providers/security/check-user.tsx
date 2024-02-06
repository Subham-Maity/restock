"use client";
import React from "react";
import CheckUser from "@/security/protected-route/check-user";

const CheckUserProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CheckUser>{children}</CheckUser>
    </>
  );
};

export default CheckUserProvider;
