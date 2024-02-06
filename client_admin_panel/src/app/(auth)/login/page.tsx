"use client";
import React from "react";
import Login from "@/components/auth/login/login";
import IfUserAdminLoginRedirect from "@/security/login/if-user-admin-login-redirect";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <IfUserAdminLoginRedirect>
        <Login />
      </IfUserAdminLoginRedirect>
    </div>
  );
};

export default Page;
