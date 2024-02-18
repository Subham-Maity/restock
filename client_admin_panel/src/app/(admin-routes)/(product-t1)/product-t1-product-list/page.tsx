import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import { AdminPcComponentProductList } from "@/components/product-t1/products/product-main";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <AdminPcComponentProductList />
    </IfUserThenIfAdmin>
  );
};

export default Page;
