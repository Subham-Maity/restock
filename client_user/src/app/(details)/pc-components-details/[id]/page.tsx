import HomeFooter from "@/components/common/home/home-footer";

import React from "react";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";
import ProductMainPcDetails from "@/components/details/pc-product/product-main-pc-details";
import TopLoader from "@/loader/top-loader/top-loader";

const page = () => {
  return (
    <div>
      <TopLoader>
        <HomeTopNav />
        <MarginWrapper>
          <ProductMainPcDetails />
        </MarginWrapper>
        <HomeFooter />
      </TopLoader>
    </div>
  );
};

export default page;
