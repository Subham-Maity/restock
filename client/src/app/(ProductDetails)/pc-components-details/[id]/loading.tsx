import React from 'react';

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProductDetailsSkeleton
    from "@/components/products/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";

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