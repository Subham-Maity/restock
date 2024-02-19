"use client";
import React from "react";
import Login from "@/components/auth/login/login";
import IfUserAdminLoginRedirect from "@/security/login/if-user-admin-login-redirect";
import PageMergin from "@/wrapper/page-mergin";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <IfUserAdminLoginRedirect>
        <PageMergin>
          <Login />
        </PageMergin>
      </IfUserAdminLoginRedirect>
    </div>
  );
};

export default Page;
