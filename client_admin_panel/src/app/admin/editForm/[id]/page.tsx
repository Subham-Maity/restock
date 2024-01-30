import React from "react";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";
import ProductForm from "@/components/admin/pages/pc-components/ProductFrom/ProductForm";

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
