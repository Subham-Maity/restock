import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import { AdminPcComponentProductList } from "@/components/product-t1/products/product-main";
import PageMergin from "@/wrapper/page-mergin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <AdminPcComponentProductList />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default Page;
