import React from 'react';

import ProductDetailsSkeleton
    from "@/components/admin/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";

const Loading = () => {
    return (
        <div>

            <ProductDetailsSkeleton />

        </div>
    );
};

export default Loading;