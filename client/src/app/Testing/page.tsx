"use client";

import ProductDetailsSkeleton from "@/app/components/products/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";
import CartHoverOnMouse from "@/app/components/cart/CartHoverOnMouse";
import CustomButton from "@/app/components/CustomButton/CustomButton";
import { FaHandBackFist, FaRightLeft } from "react-icons/fa6";
import ProductListSkeleton from "@/app/components/products/pages/pc-components/skeleton/ProductListSkeleton";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <ProductDetailsSkeleton/>
    </div>
  );
};

export default page;
