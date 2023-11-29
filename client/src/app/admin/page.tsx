import React from "react";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import DefaultLayout from "@/app/components/admin/components/AdminNav/DefaultNav";
import { AdminPcComponentProductList } from "@/app/components/admin/pages/pc-components/ProductList/AdminProductList";

const Page = () => {
  return (
    <div>
      {/*<AdminProtected>*/}
      <DefaultLayout>
        <AdminPcComponentProductList />
      </DefaultLayout>
      {/*</AdminProtected>*/}
    </div>
  );
};

export default Page;
