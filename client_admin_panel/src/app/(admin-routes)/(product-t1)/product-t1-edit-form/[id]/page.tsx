import React from "react";
import ProductForm from "@/components/product-t1/update/update-product";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <ProductForm />
    </IfUserThenIfAdmin>
  );
};

export default Page;
