import React from "react";
import AdminProductDetail from "@/app/components/admin/components/AdminProductDetail";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import DefaultLayout from "@/app/components/admin/components/AdminNav/DefaultNav";

const page = () => {
  return (
    <div>
        <AdminProtected>
            <DefaultLayout>
         <TailwindWrapper>
        <AdminProductDetail />
        </TailwindWrapper>
            </DefaultLayout>
        </AdminProtected>
    </div>
  );
};

export default page;
