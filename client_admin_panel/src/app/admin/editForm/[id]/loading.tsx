import React from "react";

import HomeFooter from "@/components/common/home/home-footer";
import ProductDetailsSkeleton from "@/components/admin/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";

const Loading = () => {
  return (
    <div>
      <ProductDetailsSkeleton />
      <HomeFooter />
    </div>
  );
};

export default Loading;
