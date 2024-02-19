import React from "react";
import ProductForm from "@/components/product-t1/update/update-product";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <ProductForm />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default Page;
