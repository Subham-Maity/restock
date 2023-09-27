import React from "react";
import { AdminPcComponentProductList } from "@/app/components/admin/components/AdminProductList";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <AdminPcComponentProductList />
      </AdminProtected>
    </div>
  );
};

export default Page;
