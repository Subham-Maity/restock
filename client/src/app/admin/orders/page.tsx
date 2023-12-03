import React from "react";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";
import AdminOrders from "@/components/admin/components/AdminOrder/AdminOrders";


const Page = () => {
  return (
    <div>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <AdminOrders />
      </DefaultNav>
      {/*</AdminProtected>*/}
    </div>
  );
};

export default Page;
