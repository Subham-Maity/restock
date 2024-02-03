import React from "react";
import OrderTable from "@/components/order/order-table";
import dynamic from "next/dynamic";
import DefaultNav from "@/components/layout/layout";
import AdminProtected from "@/security/protected-route/admin-protected";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <DefaultNav>
          <OrderTable />
        </DefaultNav>
      </AdminProtected>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Page), { ssr: false });
