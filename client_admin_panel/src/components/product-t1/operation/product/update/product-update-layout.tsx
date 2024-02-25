"use client";

import React, { useContext } from "react";
import ProductPreview from "@/components/product-t1/operation/product/preview/product-preview";
import { isValidObjectId } from "@/components/product-t1/operation/product/update/no-url-parameter/validation";
import NoUrlParameter from "@/components/product-t1/operation/product/update/no-url-parameter/no-url-parameter";
import Context from "@/store/context/context";
import UpdateProductForm from "@/components/product-t1/operation/product/update/product-form";

const ProductUpdateLayout = () => {
  const { product, setProduct } = useContext(Context);
  console.log(product);
  const { prevPath } = useContext(Context);
  const id1 = prevPath.split("/")[2];
  const id2 = prevPath.split("/")[3];
  if ((!id1 || !isValidObjectId(id1)) && (!id2 || !isValidObjectId(id2))) {
    return <NoUrlParameter />;
  } else {
    return (
      <>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ProductPreview />
          </div>
          <div className="lg:col-span-2 ">
            <UpdateProductForm />
          </div>
        </div>
      </>
    );
  }
};

export default ProductUpdateLayout;
