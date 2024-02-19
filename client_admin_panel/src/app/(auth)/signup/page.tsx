import React from "react";
import Signup from "@/components/auth/register/signup";
import IfUserAdminLoginRedirect from "@/security/login/if-user-admin-login-redirect";
import PageMergin from "@/wrapper/page-mergin";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <IfUserAdminLoginRedirect>
        <PageMergin>
          <Signup />
        </PageMergin>
      </IfUserAdminLoginRedirect>
    </div>
  );
};

export default Page;
