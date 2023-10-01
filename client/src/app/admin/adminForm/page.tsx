import React from 'react';

import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import ProductForm from "@/app/components/admin/components/ProductForm";

const Page = () => {
    return (
        <div>
            <Navbar/>
            <TailwindWrapper>
      <ProductForm/>
            </TailwindWrapper>
            <Footer/>
        </div>
    );
};

export default Page;