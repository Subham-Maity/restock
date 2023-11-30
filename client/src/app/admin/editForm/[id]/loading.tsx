import React from 'react';

import Footer from "@/components/Footer/Footer";
import ProductDetailsSkeleton
    from "@/components/admin/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";

const Loading = () => {
    return (
        <div>

            <ProductDetailsSkeleton />
            <Footer/>
        </div>
    );
};

export default Loading;