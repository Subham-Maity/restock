import React from "react";
import OrderTable from "@/components/order/order-table";
import dynamic from "next/dynamic";
import DefaultNav from "@/components/layout/layout";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <DefaultNav>
        <OrderTable />
      </DefaultNav>
    </IfUserThenIfAdmin>
  );
};

export default dynamic(() => Promise.resolve(Page), { ssr: false });
