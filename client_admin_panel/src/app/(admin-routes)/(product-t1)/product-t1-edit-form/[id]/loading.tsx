import React from "react";

import HomeFooter from "@/components/common/home-footer";
import ProductDetailsSkeleton from "@/loader/skeleton/product-main-pc-details-skeleton";

const Loading = () => {
  return (
    <div>
      <ProductDetailsSkeleton />
      <HomeFooter />
    </div>
  );
};

export default Loading;
