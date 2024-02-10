import React from "react";
import Checkout from "@/components/checkout/checkout";
import HomeFooter from "@/components/common/home/home-footer";
import UserProtected from "@/security/protected-route/user-protected";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";

const Page = () => {
  return (
    <>
      <HomeTopNav />
      <UserProtected>
        <MarginWrapper>
          <Checkout />
        </MarginWrapper>
      </UserProtected>
      <HomeFooter />
    </>
  );
};

export default Page;
