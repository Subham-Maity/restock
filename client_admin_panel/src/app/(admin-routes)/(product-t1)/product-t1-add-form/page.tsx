import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import AddNewProductForm from "@/components/product-t1/create/product-form";
import ProductAddLayout from "@/components/product-t1/create/product-add-layout";

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
