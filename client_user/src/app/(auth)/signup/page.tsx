import React from "react";
import Signup from "@/components/auth/register/signup";
import IfUserAdminLoginRedirect from "@/security/login/if-user-admin-login-redirect";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <IfUserAdminLoginRedirect>
        <Signup />
      </IfUserAdminLoginRedirect>
    </div>
  );
};

export default Page;
