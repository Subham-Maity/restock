import HomeFooter from "@/components/common/home/home-footer";

import React from "react";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";
import ProductMainPcDetails from "@/components/details/pc-product/product-main-pc-details";

const page = () => {
  return (
    <div>
      <HomeTopNav />
      <MarginWrapper>
        <ProductMainPcDetails />
      </MarginWrapper>
      <HomeFooter />
    </div>
  );
};

export default page;
