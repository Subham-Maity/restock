import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import AddNewProductForm from "@/components/add-new/products/product-form";
import ProductAddLayout from "@/components/add-new/products/product-add-layout";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <div className="mt-20">
        <ProductAddLayout />
      </div>
    </IfUserThenIfAdmin>
  );
};

export default Page;
