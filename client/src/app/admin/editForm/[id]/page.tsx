import React from 'react';

import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import DefaultLayout from "@/app/components/admin/components/AdminNav/DefaultNav";
import ProductForm from "@/app/components/admin/pages/pc-components/ProductFrom/ProductForm";

const Page = () => {
    return (
        <div>
            {/*<AdminProtected>*/}
            <DefaultLayout>
                <ProductForm/>
            </DefaultLayout>
            {/*</AdminProtected>*/}
        </div>
    );
};

export default Page;