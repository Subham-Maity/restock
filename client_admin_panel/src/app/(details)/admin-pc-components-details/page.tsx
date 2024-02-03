import React from "react";

import MarginWrapper from "@/wrapper/margin-wrapper";
import AdminProtected from "@/security/protected-route/admin-protected";
import DefaultNav from "@/components/layout/layout";
import ProductMainPcDetails from "@/components/details/pc-product-details/product-main-pc-details";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <DefaultNav>
          <MarginWrapper>
            <ProductMainPcDetails />
          </MarginWrapper>
        </DefaultNav>
      </AdminProtected>
    </div>
  );
};

export default page;
