import React from "react";
import DefaultNav from "@/components/layout/layout";
import ProductForm from "@/components/update/products/update-pc-product-form";
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
