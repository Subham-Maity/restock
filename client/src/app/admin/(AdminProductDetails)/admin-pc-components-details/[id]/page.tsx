import React from "react";

import MarginWrapper from "@/wrapper/margin-wrapper";
import DefaultNav from "@/components/layout/layout";
import ProductMainPcDetails from "@/components/details/pc-product/product-main-pc-details";

const page = () => {
  return (
    <div>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <MarginWrapper>
          <ProductMainPcDetails />
        </MarginWrapper>
      </DefaultNav>
      {/*</AdminProtected>*/}
    </div>
  );
};

export default page;
