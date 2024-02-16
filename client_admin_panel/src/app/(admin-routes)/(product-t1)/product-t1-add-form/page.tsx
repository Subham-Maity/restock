import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import AddNewProductForm from "@/components/add-new/products/product-form";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <div className="mt-20">
        <AddNewProductForm />
      </div>
    </IfUserThenIfAdmin>
  );
};

export default Page;
