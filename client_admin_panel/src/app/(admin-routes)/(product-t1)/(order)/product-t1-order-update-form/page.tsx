import React from "react";
import OrderTable from "@/components/product-t1/orders/optional/order-table";
import dynamic from "next/dynamic";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <OrderTable />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default dynamic(() => Promise.resolve(Page), { ssr: false });
