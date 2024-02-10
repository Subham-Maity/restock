import React from "react";
import UserProfile from "@/components/info/own/user-info/user-profile";

import HomeFooter from "@/components/common/home/home-footer";
import UserProtected from "@/security/protected-route/user-protected";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";

const Page = () => {
  return (
    <div>
      <HomeTopNav />
      <UserProtected>
        <MarginWrapper>
          <UserProfile />
        </MarginWrapper>
      </UserProtected>
      <HomeFooter />
    </div>
  );
};

export default Page;
