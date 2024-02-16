import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import { AdminPcComponentProductList } from "@/components/products/product-main-pc";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <AdminPcComponentProductList />
    </IfUserThenIfAdmin>
  );
};

export default Page;
