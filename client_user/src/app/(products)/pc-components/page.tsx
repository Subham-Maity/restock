"use client";
import React from "react";

import HomeFooter from "@/components/common/home/home-footer";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";
import { PcComponentProductList } from "@/components/products/product-main-pc";
import TopLoader from "@/loader/top-loader/top-loader";

const page = () => {
  return (
    <>
      <TopLoader>
        <HomeTopNav />
        <MarginWrapper>
          <PcComponentProductList />
        </MarginWrapper>
      </TopLoader>
      <HomeFooter />
    </>
  );
};

export default page;
