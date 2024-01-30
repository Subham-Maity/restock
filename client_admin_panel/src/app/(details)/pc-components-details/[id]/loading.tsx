import React from "react";
import HomeFooter from "@/components/common/home/home-footer";
import HomeTopNav from "@/components/common/home/home-top-nav";
import ProductDetailsSkeleton from "@/loader/skeleton/product-main-pc-details-skeleton";

const Loading = () => {
  return (
    <div>
      <HomeTopNav />
      <ProductDetailsSkeleton />
      <HomeFooter />
    </div>
  );
};

export default Loading;
