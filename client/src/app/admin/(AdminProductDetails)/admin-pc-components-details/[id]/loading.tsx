import React from 'react';
import ProductDetailsSkeleton
    from "@/app/components/products/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

const Loading = () => {
    return (
        <div>
            <Navbar/>
            <ProductDetailsSkeleton />
            <Footer/>
        </div>
    );
};

export default Loading;