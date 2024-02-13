import React from "react";
import ProductForm from "@/components/update/products/update-pc-product-form";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <ProductForm />
    </IfUserThenIfAdmin>
  );
};

export default Page;
