import React from 'react';

import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";
import ProductForm from "@/app/components/admin/components/ProductForm";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import DefaultLayout from "@/app/components/admin/components/AdminNav/DefaultNav";

const Page = () => {
    return (
        <div>
            <AdminProtected>
                <DefaultLayout>
            <TailwindWrapper>
              <ProductForm/>
            </TailwindWrapper>
                </DefaultLayout>
            </AdminProtected>
        </div>
    );
};

export default Page;