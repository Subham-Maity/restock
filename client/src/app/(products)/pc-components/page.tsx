"use client";
import React from "react";

import HomeFooter from "@/components/common/home/home-footer";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";
import { PcComponentProductList } from "@/components/products/product-main-pc";

const page = () => {
  return (
    <>
      <div className="">
        <HomeTopNav />
        <MarginWrapper>
          <PcComponentProductList />
        </MarginWrapper>
      </div>
      <HomeFooter />
    </>
  );
};

export default page;
