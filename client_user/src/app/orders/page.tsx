import React from "react";
import UserOrders from "@/components/info/own/pc-order/user-pc-order-details";

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
          <UserOrders />
        </MarginWrapper>
      </UserProtected>
      <HomeFooter />
    </div>
  );
};

export default Page;
