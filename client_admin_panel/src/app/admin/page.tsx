import React from "react";
import { AdminPcComponentProductList } from "@/components/products/product-main-pc";
import dynamic from "next/dynamic";
import DefaultNav from "@/components/layout/layout";
import AdminProtected from "@/security/protected-route/admin-protected";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <DefaultNav>
          <AdminPcComponentProductList />
        </DefaultNav>
      </AdminProtected>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Page), { ssr: false });
