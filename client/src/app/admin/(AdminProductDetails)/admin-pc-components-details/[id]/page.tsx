import React from "react";

import TailwindWrapper from "@/lib/wrapper/UserPannel/TailwindWrapper";
import AdminProtected from "@/lib/providers/Protected/Admin/protectedAdmin";

import AdminProductDetail from "@/components/admin/components/PcComponentsProductDetails/AdminProductDetail";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";


const page = () => {
  return (
    <div>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <TailwindWrapper>
          <AdminProductDetail />
        </TailwindWrapper>
      </DefaultNav>
      {/*</AdminProtected>*/}
    </div>
  );
};

export default page;
