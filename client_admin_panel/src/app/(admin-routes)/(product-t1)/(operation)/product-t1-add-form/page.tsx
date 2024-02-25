import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import ProductAddLayout from "@/components/product-t1/operation/product/create/product-add-layout";
import PageMergin from "@/wrapper/page-mergin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <ProductAddLayout />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default Page;
