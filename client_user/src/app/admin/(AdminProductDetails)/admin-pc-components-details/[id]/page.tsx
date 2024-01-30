import React from "react";

import MarginWrapper from "@/wrapper/margin-wrapper";

import AdminProductDetail from "@/components/admin/components/PcComponentsProductDetails/AdminProductDetail";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";

const page = () => {
  return (
    <div>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <MarginWrapper>
          <AdminProductDetail />
        </MarginWrapper>
      </DefaultNav>
      {/*</AdminProtected>*/}
    </div>
  );
};

export default page;
