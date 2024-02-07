import React from "react";
import Login from "@/components/auth/login/login";
import IfUserLoginRedirect from "@/security/login/if-user-login-redirect";
import TopLoader from "@/loader/top-loader/top-loader";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <TopLoader>
        <IfUserLoginRedirect>
          <Login />
        </IfUserLoginRedirect>
      </TopLoader>
    </div>
  );
};

export default Page;
