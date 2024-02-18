import React from "react";
import OrderTable from "@/components/product-t1/table/order-table";
import dynamic from "next/dynamic";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <OrderTable />
    </IfUserThenIfAdmin>
  );
};

export default dynamic(() => Promise.resolve(Page), { ssr: false });
