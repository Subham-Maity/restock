import React from "react";

import AdminProtected from "@/lib/providers/Protected/Admin/protectedAdmin";
import ProductForm from "@/components/admin/pages/pc-components/ProductFrom/ProductForm";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";
;


const Page = () => {
  return (
    <div>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <ProductForm />
      </DefaultNav>
      {/*</AdminProtected>*/}
    </div>
  );
};

export default Page;
