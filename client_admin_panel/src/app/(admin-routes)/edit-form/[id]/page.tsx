import React from "react";
import ProductForm from "@/components/update/products/update-pc-product-form";
import DefaultNav from "@/components/layout/layout";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <DefaultNav>
        <ProductForm />
      </DefaultNav>
    </IfUserThenIfAdmin>
  );
};

export default Page;
