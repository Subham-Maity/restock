import React from "react";
import AdminProtected from "@/lib/providers/Protected/Admin/protectedAdmin";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";
import {AdminPcComponentProductList} from "@/components/admin/pages/pc-components/ProductList/AdminProductList";


const Page = () => {
  return (
    <div>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <AdminPcComponentProductList />
      </DefaultNav>
      {/*</AdminProtected>*/}
    </div>
  );
};

export default Page;
