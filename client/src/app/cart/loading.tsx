import React from 'react';
import ProductDetailsSkeleton
    from "@/app/components/products/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";

const Loading = () => {
    return (
        <div>
           <ProductDetailsSkeleton/>
        </div>
    );
};

export default Loading;