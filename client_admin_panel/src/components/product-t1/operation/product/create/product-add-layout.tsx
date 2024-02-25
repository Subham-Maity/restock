import React from "react";
import ProductPreview from "@/components/product-t1/operation/product/preview/product-preview";
import UpdateProductForm from "@/components/product-t1/operation/product/create/product-form";

const ProductAddLayout = () => {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <ProductPreview />
      </div>
      <div className="lg:col-span-2 ">
        <UpdateProductForm />
      </div>
    </div>
  );
};

export default ProductAddLayout;
