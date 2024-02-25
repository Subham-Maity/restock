import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";
import ProductUpdateLayout from "@/components/product-t1/operation/product/update/product-update-layout";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <ProductUpdateLayout />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default Page;
