import React from "react";

import MarginWrapper from "@/wrapper/margin-wrapper";
import DefaultNav from "@/components/layout/layout";
import ProductMainPcDetails from "@/components/details/pc-product-details/product-main-pc-details";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const page = () => {
  return (
    <IfUserThenIfAdmin>
      <DefaultNav>
        <MarginWrapper>
          <ProductMainPcDetails />
        </MarginWrapper>
      </DefaultNav>
    </IfUserThenIfAdmin>
  );
};

export default page;
