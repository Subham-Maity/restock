import React from "react";
import Signup from "@/components/auth/register/signup";
import IfUserLoginRedirect from "@/security/login/if-user-login-redirect";
import TopLoader from "@/loader/top-loader/top-loader";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <TopLoader>
        <IfUserLoginRedirect>
          <Signup />
        </IfUserLoginRedirect>
      </TopLoader>
    </div>
  );
};

export default Page;
