import React from "react";
import ProductForm from "@/components/update/products/update-pc-product-form";
import DefaultNav from "@/components/layout/layout";
import AdminProtected from "@/security/protected-route/admin-protected";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <DefaultNav>
          <ProductForm />
        </DefaultNav>
      </AdminProtected>
    </div>
  );
};

export default Page;
