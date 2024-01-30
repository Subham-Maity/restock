"use client";

import Cart from "@/components/cart/cart";

import HomeFooter from "@/components/common/home/home-footer";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";

const Page = () => {
  return (
    <div>
      <HomeTopNav />
      <MarginWrapper>
        <Cart />
      </MarginWrapper>
      <HomeFooter />
    </div>
  );
};

export default Page;
